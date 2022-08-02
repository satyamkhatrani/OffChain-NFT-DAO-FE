import React, { useState } from "react";
import { useAccount } from "wagmi";
import Asset from "./Asset";

const AssetsData = [
  {
    image: "https://mdbootstrap.com/img/new/standard/city/047.jpg",
    name: "ERC20",
    tokenValue: "23.32 TOKEN",
    amount: "2121.23",
    upDownValue: "+11(2121.23)",
  },
  {
    image: "https://mdbootstrap.com/img/new/standard/city/047.jpg",
    name: "NFT",
    tokenValue: "23.32 TOKEN",
    amount: "2121.23",
    upDownValue: "-11(2121.23)",
  },
  {
    image: "https://mdbootstrap.com/img/new/standard/city/047.jpg",
    name: "ETH",
    tokenValue: "23.32 TOKEN",
    amount: "2121.23",
    upDownValue: "+11(2121.23)",
  },
];

const Treasury = () => {
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
              <Asset data={data} key={index} />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Treasury;
