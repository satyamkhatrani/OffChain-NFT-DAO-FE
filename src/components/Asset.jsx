import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { MdRemoveCircleOutline, MdAddCircleOutline } from "react-icons/md";
import { useAccount } from "wagmi";
import DepositModal from "./DepositModal";
import WithdrawModal from "./WithdrawModal";
import contractAddress from "../contracts/contract-address.json";
import Treasury from "../contracts/Treasury.json";

const Asset = (props) => {
  const { data } = props;
  const { address } = useAccount();
  const [isOpen, setIsOpen] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [openDepositModal, setOpenDepositModal] = useState(false);
  const [openWithdrawModal, setOpenWithdrawModal] = useState(false);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = await provider.getSigner();
    const treasuryContract = new ethers.Contract(
      contractAddress.Treasury,
      Treasury,
      signer
    );
    const owner = await treasuryContract.owner();
    if (owner === address) {
      setIsOwner(true);
    } else {
      setIsOwner(false);
    }
  };

  return (
    <li
      key={data.key + ""}
      className="border-b border-gray-600"
      style={{ borderColor: "#2d2d2d" }}
      onClick={() => {
        setIsOpen(!isOpen);
      }}
    >
      <div className="flex flex-row justify-between py-2 px-4 w-full">
        <div className="flex flex-row">
          <img
            src={data.image}
            className="h-10 w-10 rounded-full self-center"
            alt=""
          />
          <div className="mx-3 flex flex-col">
            <span>{data.name}</span>
            <p className="font-normal text-gray-400 text-sm">
              {`${data.tokenValue} ${data.ticker}`}
            </p>
          </div>
        </div>
        <div className="mx-3 flex flex-col items-end self-center">
          {isOpen ? (
            <MdRemoveCircleOutline
              style={{
                color: "red",
                fontSize: "20px",
                alignSelf: "center",
                marginLeft: "5px",
              }}
            />
          ) : (
            <MdAddCircleOutline
              style={{
                color: "green",
                fontSize: "20px",
                alignSelf: "center",
                marginLeft: "5px",
              }}
            />
          )}
        </div>
      </div>
      {isOpen && (
        <div className="flex flex-row">
          {isOwner && (
            <button
              className="text-white ml-5 mt-5 mb-5 bg-blue-600 w-11/12  mx-auto font-bold  py-2 rounded-full border"
              style={{ borderColor: "#2d2d2d" }}
              onClick={() => {
                setOpenWithdrawModal(true);
              }}
            >
              Withdraw
            </button>
          )}
          <button
            className="text-white ml-5 mt-5 mb-5 bg-blue-600 w-11/12  mx-auto font-bold  py-2 rounded-full border"
            style={{ borderColor: "#2d2d2d" }}
            onClick={() => {
              setOpenDepositModal(true);
            }}
          >
            Deposit
          </button>
        </div>
      )}
      {openDepositModal && (
        <DepositModal data={data} setShowModal={setOpenDepositModal} />
      )}
      {openWithdrawModal && (
        <WithdrawModal data={data} setShowModal={setOpenWithdrawModal} />
      )}
    </li>
  );
};

export default Asset;
