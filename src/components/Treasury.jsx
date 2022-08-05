import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import Asset from "./Asset";
import ERC20 from "../contracts/ERC20.json";
import NFT from "../contracts/SoluNFT.json";
import contractAddress from "../contracts/contract-address.json";

const Treasury = () => {
  const [asset, setAsset] = useState([]);
  const { address } = useAccount();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    init();
  }, [address]);

  const init = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = await provider.getSigner();
    const erc20 = new ethers.Contract(
      contractAddress.TokenAddress,
      ERC20,
      signer
    );
    const nft = new ethers.Contract(contractAddress.SoluNFT, NFT.abi, signer);
    const balERC20 = await erc20.balanceOf(contractAddress.Treasury);
    const symERC20 = await erc20.symbol();
    const balNFT = await nft.balanceOf(contractAddress.Treasury);
    const symNFT = await nft.symbol();
    const balETH = await provider.getBalance(contractAddress.Treasury);
    const data = [
      {
        image:
          "https://cdn.dribbble.com/users/2210413/screenshots/6511262/erc20-badge2.png",
        name: "ERC20",
        tokenValue: ethers.utils.formatEther(balERC20),
        ticker: symERC20,
      },
      {
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/NFT_Icon.png/480px-NFT_Icon.png",
        name: "NFT",
        tokenValue: ethers.utils.formatUnits(balNFT, 0),
        ticker: symNFT,
      },
      {
        image:
          "https://d33wubrfki0l68.cloudfront.net/fcd4ecd90386aeb50a235ddc4f0063cfbb8a7b66/4295e/static/bfc04ac72981166c740b189463e1f74c/40129/eth-diamond-black-white.jpg",
        name: "ETH",
        tokenValue: ethers.utils.formatEther(balETH),
        ticker: "ETH",
      },
    ];
    setAsset(data);
    setIsLoading(false);
  };

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
            {isLoading ? (
              <div className="flex justify-center p-4">
                <div className="loader-xl" />
              </div>
            ) : (
              asset.map((data, index) => <Asset data={data} key={index} />)
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Treasury;
