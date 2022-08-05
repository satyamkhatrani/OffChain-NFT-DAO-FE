import React, { useEffect, useState } from "react";
import { MdOutlineVerified } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { useAccount } from "wagmi";
import { ethers } from "ethers";
import Artifact from "../contracts/SoluNFT.json";
import contractAddress from "../contracts/contract-address.json";

export const Sidebar = () => {
  const { address, isConnected } = useAccount();
  const [isAdmin, setIsAdmin] = useState(false);

  const checkAdmin = async () => {
    if (isConnected) {
      let Provider = new ethers.providers.Web3Provider(window.ethereum);
      const Signer = await Provider.getSigner();
      const CONTRACT = new ethers.Contract(
        contractAddress.SoluNFT,
        Artifact.abi,
        Signer
      );
      const adminAddress = await CONTRACT.owner();
      if (address === adminAddress) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    }
  };

  useEffect(() => {
    checkAdmin();
  });

  return (
    <div
      className="md:w-64 sm:w-full  py-4 px-3 m-5 rounded-xl border"
      style={{ borderColor: "#2d2d2d" }}
    >
      <img
        src="https://mdbootstrap.com//img/Photos/Square/1.jpg"
        className="w-12 mx-auto md:max-w-full h-auto rounded-full"
        alt=""
      />
      <h5 className="mb-8 text-2xl mt-4 font-bold text-center text-white flex flex-row justify-center">
        SoluLab DAO
        <MdOutlineVerified
          style={{
            color: "green",
            fontSize: "20px",
            alignSelf: "center",
            marginLeft: "5px",
          }}
        />
      </h5>
      <ul className="space-y-2 sidebar-nav-links">
        <li>
          <NavLink
            to="/"
            className="flex items-center ml-3 p-2 text-base font-normal  rounded-lg text-white hover:bg-gray-700"
          >
            {" "}
            Proposal
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/Create"
            className="flex items-center ml-3 p-2 text-base font-normal  rounded-lg text-white hover:bg-gray-700"
          >
            {" "}
            New Proposal
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/Treasury"
            className="flex items-center ml-3 p-2 text-base font-normal rounded-lg text-white hover:bg-gray-700"
          >
            {" "}
            Treasury
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/About"
            className="flex items-center ml-3 p-2 text-base font-normal  rounded-lg text-white hover:bg-gray-700"
          >
            {" "}
            About
          </NavLink>
        </li>
        {isConnected && isAdmin && (
          <li>
            <NavLink
              to="/create-nft"
              className="flex items-center ml-3 p-2 text-base font-normal  rounded-lg text-white hover:bg-gray-700"
            >
              {" "}
              Create NFT
            </NavLink>
          </li>
        )}
      </ul>
    </div>
  );
};
