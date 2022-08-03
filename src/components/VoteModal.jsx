import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import contractAddress from "../contracts/contract-address.json";
import Artifact from "../contracts/SoluNFT.json";
import { BASE_URL } from "../constants/apiBase";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const VoteModal = (props) => {
  const { setShowModal, voteFor, proposalHash } = props;
  const { address, isConnected } = useAccount();
  const [voteCount, setVoteCount] = useState(-1);
  const [snapshot, setSnapshot] = useState(0);
  const [tokenId, setTokenId] = useState([]);
  const navigate = useNavigate();

  const init = async () => {
    if (isConnected) {
      const Provider = new ethers.providers.Web3Provider(window.ethereum);
      const snapshot = await Provider.getBlockNumber();
      setSnapshot(snapshot);
      const Signer = await Provider.getSigner();
      const CONTRACT = new ethers.Contract(
        contractAddress.SoluNFT,
        Artifact.abi,
        Signer
      );
      const balance = await CONTRACT.balanceOf(address);
      let tokens = [];
      for (var i = 0; i < balance; i++) {
        const id = await CONTRACT.tokenOfOwnerByIndex(address, i);
        tokens.push(id.toNumber());
      }
      setTokenId(tokens);
      setVoteCount(balance.toNumber());
    }
  };

  useEffect(() => {
    init();
  });

  const handleSubmit = async () => {
    const data = {
      userAddress: address,
      voteCount: voteCount,
      voteFor: voteFor.index,
      tokenId: tokenId,
    };
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const sign = await signer.signMessage(JSON.stringify(data));

    var config = {
      method: "put",
      url: `${BASE_URL}proposal/${proposalHash}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: { signature: { ...data, sign: sign } },
    };
    axios(config)
      .then(function (resp) {
        navigate(`/Details/${proposalHash}`);
      })
      .catch(function (error) {
        console.log(error);
      });

    setShowModal(false);
  };

  return (
    <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
      <div className="relative w-auto my-6 mx-auto max-w-3xl">
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-800 outline-none focus:outline-none">
          <div className="flex items-start justify-between p-5  border-gray-300 rounded-t self-center">
            <span className="text-xl text-white">Vote Overview</span>
          </div>
          <div className="relative py-1 px-5 flex-auto">
            <div className="mx-auto max-w-2xl mb-5 text-lg font-medium rounded-lg border border-gray-600 text-white">
              <div className="px-6 pt-6 pb-8" style={{ width: 450 }}>
                <div className="w-full flex justify-between mb-2">
                  <span className="text-base text-gray-300">Option(s)</span>
                  <span className="text-base">{voteFor.option}</span>
                </div>
                <div className="w-full flex justify-between  mb-2">
                  <span className="text-base text-gray-300">Snapshot</span>
                  {snapshot > 0 ? (
                    <span className="text-base">{`${parseInt(
                      snapshot
                    ).toLocaleString()}`}</span>
                  ) : (
                    <div className="loader" />
                  )}
                </div>
                <div className="w-full flex justify-between">
                  <span className="text-base text-gray-300">
                    Your Voting Power
                  </span>
                  {voteCount >= 0 ? (
                    <span className="text-base">{`${voteCount} VP`}</span>
                  ) : (
                    <div className="loader" />
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-around p-6 border-t border-gray-600 rounded-b">
              <button
                className="text-white w-40 background-transparent rounded-full border border-gray-600 font-bold px-6 py-3 text-sm outline-none focus:outline-none mr-1 mb-1"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className={`${
                  voteCount > 0 ? "bg-blue-600" : "bg-slate-700"
                } text-white w-40 border border-gray-600 font-bold text-sm px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1`}
                type="button"
                onClick={handleSubmit}
                disabled={voteCount <= 0}
              >
                Vote
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoteModal;
