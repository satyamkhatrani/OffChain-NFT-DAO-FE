import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useAccount } from "wagmi";
import contractAddress from '../contracts/contract-address.json';
import treasuryABI from '../contracts/Treasury.json';
import erc20ABI from '../contracts/ERC20.json';

const AssetsData = [
  {
    image: "https://mdbootstrap.com/img/new/standard/city/047.jpg",
    name: "Assets Name 1",
    tokenValue: "23.32 TOKEN",
    amount: "2121.23",
    upDownValue: "+11(2121.23)",
  },
  {
    image: "https://mdbootstrap.com/img/new/standard/city/047.jpg",
    name: "Assets Name 2",
    tokenValue: "23.32 TOKEN",
    amount: "2121.23",
    upDownValue: "-11(2121.23)",
  },
  {
    image: "https://mdbootstrap.com/img/new/standard/city/047.jpg",
    name: "Assets Name 3",
    tokenValue: "23.32 TOKEN",
    amount: "2121.23",
    upDownValue: "+11(2121.23)",
  },
];

const Treasury = () => {
  
  const { address } = useAccount();
  const [treasuryContract, setTreasury] = useState();
  const [tokenContract, setToken] = useState();
  const [balance, setBalance] = useState();
  const [tokenName, setTokenName] = useState();
  const [tokenSymbol, setTokenSymbol] = useState();
  const [ethBalance, setEthBalance] = useState();

  const init = async () => {
    let provider = new ethers.providers.Web3Provider(window.ethereum);
    let signer = await provider.getSigner();
    let treasury = new ethers.Contract(contractAddress.NFTDeposit, treasuryABI, signer);
    let token = new ethers.Contract(contractAddress.TokenAddress, erc20ABI, signer);
    let TokenBalance = await token.balanceOf(contractAddress.NFTDeposit);
    let TokenName = await token.name();
    let TokenSymbol = await token.symbol();
    let etherBal = await provider.getBalance(contractAddress.NFTDeposit);
    setTreasury(treasury);
    setToken(token);
    setTokenName(TokenName);
    setTokenSymbol(TokenSymbol);
    setBalance(ethers.utils.formatEther(TokenBalance));
    setEthBalance(ethers.utils.formatEther(etherBal));
  }

  const depositTokenToTreasury = async (amount) => {
    let allowance = await tokenContract.allowance(address, contractAddress.NFTDeposit)
    if(ethers.utils.formatEther(allowance) == 0){
      let approveTx = await tokenContract.approve(contractAddress.NFTDeposit, "115792089237316195423570985008687907853269984665640564039457584007913129639935")
      let depositTx = await treasuryContract.depositToken(amount);
    }else{
      let depositTx = await treasuryContract.depositToken(amount);
    }
  }

  const depositEth = async () => {
    let depositTx = await treasuryContract.depositEth("100000000000000000", { value: ethers.utils.parseEther("0.1") });
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <div>
        <div className="mx-auto mt-5 font-bold max-w-2xl text-3xl text-gray-50">
          <h1>Treasury</h1>
        </div>
        <div>
          <ul
            className="mx-auto max-w-2xl my-5 text-lg font-medium   rounded-lg border   border-gray-600 text-white"
            style={{ borderColor: "#2d2d2d" }}
          >
            <li
              className="py-2 px-4 w-full rounded-t-lg border-b  border-gray-600"
              style={{ borderColor: "#2d2d2d" }}
            >
              Assets
            </li>
            {AssetsData.map((data, index) => (
              <li
                key={index+''}
                className="flex flex-row justify-between py-2 px-4 w-full border-b  border-gray-600"
                style={{ borderColor: "#2d2d2d" }}
              >
                <div className="flex flex-row">
                  <img
                    src={data.image}
                    className="h-10 w-10 rounded-full self-center"
                    alt=""
                  />
                  <div className="mx-3 flex flex-col">
                    <span>{tokenName}</span>
                    <p className="font-normal text-gray-400 text-sm">
                      {parseFloat(balance).toFixed(3)}
                    </p>
                  </div>
                </div>
                <div className="mx-3 flex flex-col items-end">
                  <span>${(parseFloat(balance) * parseFloat(0.5)).toFixed(3)}</span>
                  <p
                    className={`font-normal ${
                      data.upDownValue.charAt(0) === "+"
                        ? "text-green-500"
                        : "text-red-500"
                    } text-sm`}
                  >
                    {data.upDownValue}
                  </p>
                </div>
                <div className="mx-3 flex flex-row items-center">
                  <button className="mt-5 px-4 py-2 rounded-lg shadow-md bg-green-600 text-white-800" onClick={() => depositTokenToTreasury("100000000000000000000")}>Deposit {tokenSymbol}</button>
                </div>
              </li>
            ))}
             <li
              className="py-2 px-4 w-full rounded-t-lg border-b  border-gray-600"
              style={{ borderColor: "#2d2d2d" }}
            >
              Deposit Ether
            </li>
            <li
                className="flex flex-row justify-between py-2 px-4 w-full border-b  border-gray-600"
                style={{ borderColor: "#2d2d2d" }}
              >
                <div className="flex flex-row">
                  <img
                    src="https://mdbootstrap.com/img/new/standard/city/047.jpg"
                    className="h-10 w-10 rounded-full self-center"
                    alt=""
                  />
                  <div className="mx-3 flex flex-col">
                    <span>{tokenName}</span>
                    <p className="font-normal text-gray-400 text-sm">
                      {parseFloat(ethBalance).toFixed(3)}
                    </p>
                  </div>
                </div>
                <div className="mx-3 flex flex-col items-end">
                  <span>${(parseFloat(ethBalance) * parseFloat(1500)).toFixed(3)}</span>
                </div>
                <div className="mx-3 flex flex-row items-center">
                  <button className="mt-5 px-4 py-2 rounded-lg shadow-md bg-green-600 text-white-800" onClick={() => depositEth()}>Deposit Ether</button>
                </div>
              </li>
          </ul>
        </div>
      </div>
      
    </>
  );
};

export default Treasury;
