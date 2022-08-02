import React, { useState } from "react";
import { MdRemoveCircleOutline, MdAddCircleOutline } from 'react-icons/md';
import DepositModal from "./DepositModal";
import WithdrawModal from "./WithdrawModal";

const Asset = (props) => {
  const { data } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [openDepositModal, setOpenDepositModal] = useState(false);
  const [openWithdrawModal, setOpenWithdrawModal] = useState(false);

  return (
    <li
      key={data.key + ''}
      className="border-b border-gray-600"
      style={{ borderColor: "#2d2d2d" }}
      onClick={() => {          
        setIsOpen(!isOpen);
      }}
    >
      <div
        className="flex flex-row justify-between py-2 px-4 w-full"
      >
        <div className="flex flex-row">
          <img
            src={data.image}
            className="h-10 w-10 rounded-full self-center"
            alt=""
          />
          <div className="mx-3 flex flex-col">
            <span>{data.name}</span>
            <p className="font-normal text-gray-400 text-sm">
              {data.tokenValue}
            </p>
          </div>
        </div>
        <div className="mx-3 flex flex-col items-end self-center">
          { isOpen ? <MdRemoveCircleOutline style={{ color: 'red', fontSize: "20px", alignSelf: "center", marginLeft: "5px" }} /> :
          <MdAddCircleOutline style={{ color: 'green', fontSize: "20px", alignSelf: "center", marginLeft: "5px" }} />}
        </div>
      </div>
      {isOpen && <div className="flex flex-row">
        <button
          className="text-white ml-5 mt-5 mb-5 bg-blue-600 w-11/12  mx-auto font-bold  py-2 rounded-full border"
          style={{ borderColor: "#2d2d2d" }}
          onClick={() => {
            setOpenWithdrawModal(true);
          }}
        >
          Withdraw
        </button>
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
      }
      {openDepositModal && <DepositModal data={data} setShowModal={setOpenDepositModal} />}
      {openWithdrawModal && <WithdrawModal setShowModal={setOpenWithdrawModal} />}
    </li>
  );
};

export default Asset;
