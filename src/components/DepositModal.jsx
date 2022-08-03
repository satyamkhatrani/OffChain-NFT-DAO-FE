import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import ERC20 from "../contracts/ERC20.json";
import NFT from "../contracts/SoluNFT.json";
import Treasury from "../contracts/Treasury.json";
import contractAddress from "../contracts/contract-address.json";

const DepositModal = (props) => {
  const { data, setShowModal } = props;

  const { address } = useAccount();
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("Ether");
  const [symbol, setSymbol] = useState("ETH");
  const [depositAmt, setDepositAmt] = useState();
  const [isError, setIsError] = useState(false);

  let Contract, treasuryContract;
  const init = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = await provider.getSigner();
    treasuryContract = new ethers.Contract(
      contractAddress.Treasury,
      Treasury,
      signer
    );
    if (data.name === "ERC20") {
      Contract = new ethers.Contract(
        contractAddress.TokenAddress,
        ERC20,
        signer
      );
    } else if (data.name === "NFT") {
      Contract = new ethers.Contract(contractAddress.SoluNFT, NFT.abi, signer);
    }
    if (data.name !== "ETH") {
      const Name = await Contract.name();
      const Symbol = await Contract.symbol();
      setName(Name);
      setSymbol(Symbol);
    }
    setLoading(false);
  };

  useEffect(() => {
    init();
  });

  const depositERC20 = async () => {
    let allowance = await Contract.allowance(address, contractAddress.Treasury);
    if(ethers.utils.formatEther(allowance) == 0){
      const amt = ethers.utils.parseEther(depositAmt);
      const allow = await Contract.approve(contractAddress.Treasury, "115792089237316195423570985008687907853269984665640564039457584007913129639935");
      await allow.wait();
      await treasuryContract.depositToken(amt);
      setShowModal(false);
    }else{
      const amt = ethers.utils.parseEther(depositAmt);
      await treasuryContract.depositToken(amt);
      setShowModal(false);
    }
  };

  const depositNFT = async () => {
    let isApprovedForAll = await Contract.isApprovedForAll(address, contractAddress.Treasury)
    console.log('%c 🍮 isApprovedForAll: ', 'font-size:20px;background-color: #E41A6A;color:#fff;', isApprovedForAll);
    if(isApprovedForAll){
      await treasuryContract.depositNFT(depositAmt);
      setShowModal(false);
    }else{
      const allow = await Contract.setApprovalForAll(
        contractAddress.Treasury,
        true
      );
      await allow.wait();
      await treasuryContract.depositNFT(depositAmt);
      setShowModal(false);
    }
   
  };

  const depositETH = async () => {
    const amt = ethers.utils.parseEther(depositAmt);
    let tx = await treasuryContract.depositEth(amt, { value: amt });
    console.log(tx);
    setShowModal(false);
  };

  return (
    <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
      <div className="relative w-auto my-6 mx-auto max-w-3xl">
        {loading ? (
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-800 outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5  border-gray-300 rounded-t self-center">
              <div className="loader-xl" />
            </div>
          </div>
        ) : (
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-800 outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5  border-gray-300 rounded-t self-center">
              <span className="text-xl text-white">{`Deposit ${name}`}</span>
            </div>
            <div className="relative py-1 px-5 flex-auto">
              <div className="mx-auto max-w-2xl mb-5 text-lg font-medium rounded-lg border border-gray-600 text-white">
                <div className="px-6 pt-6 pb-8" style={{ width: 450 }}>
                  <div className="w-full mb-2">
                    <label
                      htmlFor="amount"
                      className="block mt-2 mb-2 mx-auto max-w-2xl text-sm font-normal text-gray-400 "
                    >
                      {data.name === "NFT"
                        ? `TokenId (${symbol})`
                        : `Amount (${symbol})`}
                    </label>
                    <input
                      type="number"
                      id="amount"
                      name="amount"
                      value={depositAmt}
                      required
                      onChange={(e) => {
                        setIsError(false);
                        setDepositAmt(e.target.value);
                      }}
                      className="bg-transparent border mx-auto max-w-2xl border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  border-gray-600 placeholder-gray-400  text-white"
                      placeholder={
                        data.name === "NFT"
                          ? "tokenId that you want to deposit"
                          : "Amount that you want to Deposit"
                      }
                    />
                    {isError && (
                      <span>
                        <label
                          style={{
                            fontSize: "small",
                            fontWeight: "400",
                            color: "#ff0000",
                            paddingLeft: 5,
                          }}
                        >
                          this field is required
                        </label>
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-around p-6 border-t border-gray-600 rounded-b">
                <button
                  className="text-white w-40 background-transparent rounded-full border border-gray-600 font-bold px-6 py-3 text-sm outline-none focus:outline-none mr-1 mb-1"
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                  }}
                >
                  Cancel
                </button>
                <button
                  className={`bg-blue-600 text-white w-40 border border-gray-600 font-bold text-sm px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1`}
                  type="button"
                  onClick={() => {
                    depositAmt === undefined
                      ? setIsError(true)
                      : data.name === "ERC20"
                      ? depositERC20()
                      : data.name === "NFT"
                      ? depositNFT()
                      : depositETH();
                  }}
                >
                  Deposit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DepositModal;
