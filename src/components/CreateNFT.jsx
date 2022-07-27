import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { ADDRESS_REQUIRED } from "../constants/errorConstants";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ethers } from "ethers";
import contractAddress from '../contracts/contract-address.json';
import Artifact from '../contracts/SoluNFT.json';

const CreateNFT = () => {
  const { address, isConnected } = useAccount();
  const [isAdmin, setIsAdmin] = useState(false);

  const init = async () => {
    let Provider = new ethers.providers.Web3Provider(window.ethereum);
    const Signer = await Provider.getSigner();
    const CONTRACT = new ethers.Contract(contractAddress.SoluNFT, Artifact.abi, Signer);
    const adminAddress = await CONTRACT.owner();
    if (address === adminAddress) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }

  const handleCreateNFT = async (values) => {
    console.log('values: ', values);
    let Provider = new ethers.providers.Web3Provider(window.ethereum);
    const Signer = await Provider.getSigner();
    const CONTRACT = new ethers.Contract(contractAddress.SoluNFT, Artifact.abi, Signer);
    const mintNFT = await CONTRACT.safeMint(values.address);
    console.log('mintNFT: ', mintNFT);
    
  }

  useEffect(() => {
    init();
  }, [address]);
  
  const validationSchema = Yup.object({
    address: Yup.string().required(ADDRESS_REQUIRED),
  });

  return (
    isAdmin ? <>
      <div className="mx-auto block max-w-2xl px-5">
        <div
          className=" mt-5 p-6 mb-10 rounded-lg border shadow-md hover:bg-gray-100"
          style={{ borderColor: "#2d2d2d" }}
        >
          <p className="font-normal text-gray-400">
            You need to be an owner of Smart Contract to Create NFT.
          </p>
        </div>
        <div>
          <Formik
            initialValues={{
              address: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleCreateNFT}
          >
            {({ values, errors, touched, handleChange, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <label
                  htmlFor="address"
                  className="mt-10 my-2 text-sm font-normal text-gray-400 "
                >
                  Mint to Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  onChange={handleChange}
                  value={values.address}
                  aria-describedby="helper-text-explanation"
                  className=" border mt-2 border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full p-2.5  border-gray-600 placeholder-gray-400  focus:ring-blue-500 focus:border-blue-500 color:black"
                  placeholder="Wallet Address"
                />
                <div className="mt-2 text-sm font-normal text-red-500">
                  {errors.address && touched.address && errors.address}
                </div>
                {isConnected && (
                  <div>
                    <button
                      type="submit"
                      className="mt-5 px-4 py-2 rounded-lg border shadow-md hover:bg-gray-100 text-white hover:text-black"
                    >
                      Mint NFT
                    </button>
                  </div>
                )}
                {!isConnected && (
                  <div className="mt-5 text-sm font-normal">
                    <ConnectButton />
                  </div>
                )}
              </form>
            )}
          </Formik>
        </div>
      </div>
    </> : <>
      <div className="mx-auto mt-5 max-w-2xl text-2xl text-gray-50">
        <h1>Treasury</h1>
      </div>
      <div
        className="mx-auto mt-2 block p-6 m-2 max-w-2xl rounded-lg border shadow-md hover:bg-gray-100"
        style={{ borderColor: "#2d2d2d" }}
      >
        <p className="font-normal text-gray-400 text-center">
          You don't have access to Create NFTs.
        </p>
      </div>
    </>
  );
};

export default CreateNFT;
