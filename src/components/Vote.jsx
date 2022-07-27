import { ConnectButton } from "@rainbow-me/rainbowkit";
import React, { useState } from "react";
import { useAccount } from "wagmi";
import VoteModal from "./VoteModal";
import {} from "lodash/array"

const VoteData = [
  {
    image: "https://mdbootstrap.com/img/new/standard/city/047.jpg",
    address: "0x1e1E768df38eEe85813E93821113c9dd77Bd1111",
    vote: "I’d stake Cake for Carbo pool",
    value: "8.2 CAKEVO...",
  },
  {
    image: "https://mdbootstrap.com/img/new/standard/city/047.jpg",
    address: "0x1e1E768df38eEe85813E93821113c9dd77Bd1111",
    vote: "I’d stake Cake for Carbo pool",
    value: "8.2 CAKEVO...",
  },
  {
    image: "https://mdbootstrap.com/img/new/standard/city/047.jpg",
    address: "0x1e1E768df38eEe85813E93821113c9dd77Bd1111",
    vote: "I’d stake Cake for Carbo pool",
    value: "8.2 CAKEVO...",
  },
  {
    image: "https://mdbootstrap.com/img/new/standard/city/047.jpg",
    address: "0x1e1E768df38eEe85813E93821113c9dd77Bd1111",
    vote: "I’d stake Cake for Carbo pool",
    value: "8.2 CAKEVO...",
  },
  {
    image: "https://mdbootstrap.com/img/new/standard/city/047.jpg",
    address: "0x1e1E768df38eEe85813E93821113c9dd77Bd1111",
    vote: "I’d stake Cake for Carbo pool",
    value: "8.2 CAKEVO...",
  },
  {
    image: "https://mdbootstrap.com/img/new/standard/city/047.jpg",
    address: "0x1e1E768df38eEe85813E93821113c9dd77Bd1111",
    vote: "I’d stake Cake for Carbo pool",
    value: "8.2 CAKEVO...",
  },
  {
    image: "https://mdbootstrap.com/img/new/standard/city/047.jpg",
    address: "0x1e1E768df38eEe85813E93821113c9dd77Bd1111",
    vote: "I’d stake Cake for Carbo pool",
    value: "8.2 CAKEVO...",
  },
  {
    image: "https://mdbootstrap.com/img/new/standard/city/047.jpg",
    address: "0x1e1E768df38eEe85813E93821113c9dd77Bd1111",
    vote: "I’d stake Cake for Carbo pool",
    value: "8.2 CAKEVO...",
  },
  {
    image: "https://mdbootstrap.com/img/new/standard/city/047.jpg",
    address: "0x1e1E768df38eEe85813E93821113c9dd77Bd1111",
    vote: "I’d stake Cake for Carbo pool",
    value: "8.2 CAKEVO...",
  },
];

const VoteFor = [
  {
    voteFor: "I would stake cake for carbo pool",
  },
  {
    voteFor: " I would add liquidity to carbo farm",
  },
];
const Vote = (props) => {
  const { address, isConnected } = useAccount();
  const [selectedVote, setSelectVote] = useState();
  const [openVoteModal, setOpenVoteModal] = useState(false);

  const { data } = props; 
  console.log('data: ', data);

  const init = async () => {
    // data.proposal.voteSignature
  }

  return (
    <>
      {data.proposalStatus === "Active" && <div>
        <ul
          className="mx-auto max-w-2xl mt-5 text-lg font-medium   rounded-lg border   border-gray-600 text-white"
          style={{ borderColor: "#2d2d2d" }}
        >
          <li
            className="py-2 px-4 w-full rounded-t-lg border-b  border-gray-600"
            style={{ borderColor: "#2d2d2d" }}
          >
            Cast Your Vote
          </li>
          <li
            className=" py-2 px-4 w-full border-b"
            style={{ borderColor: "#2d2d2d" }}
          >
            {data.proposal.votingOptions.map((vote, index) => (
              vote.option != '' && <button
                key={index+""}
                className="text-white ml-5 mt-5 mx-auto font-bold w-11/12  py-2 rounded-full border"
                style={{
                  borderColor:
                    selectedVote === vote.index ? "#ffffff" : "#2d2d2d",
                }}
                onClick={() => setSelectVote(vote.index)}
              >
                {vote.option}
              </button>
            ))}
            {isConnected ? (
              <button
                className="text-white ml-5 mt-5 mb-5 bg-blue-600 w-11/12  mx-auto font-bold  py-2 rounded-full border"
                style={{ borderColor: "#2d2d2d" }}
                onClick={() => setOpenVoteModal(true)}
                disabled={selectedVote === null}
              >
                Vote
              </button>
            ) : (
              <div className="m-5" style={{ marginLeft: "35%" }}>
                <ConnectButton />
              </div>
            )}
          </li>
        </ul>
      </div>}
      {data.proposal.voteCounts > 0 &&
        <ul
          className="mx-auto max-w-2xl my-5 text-lg font-medium rounded-lg border border-gray-600 text-white"
          style={{ borderColor: "#2d2d2d" }}
        >
          <li
            className="py-2 px-4 w-full rounded-t-lg border-b border-gray-600"
            style={{ borderColor: "#2d2d2d" }}
          >
            {`Votes - ${data.proposal.voteSignature.length}`}
          </li>
          {data.proposal.voteSignature.map((vSig, index) => (
            <li
              key={index+""}
              className="flex flex-row justify-between py-2 px-4 w-full border-b  border-gray-600"
              style={{ borderColor: "#2d2d2d" }}
            >
              <div className="flex flex-row">
                <img
                  src={''}
                  className=" h-8 w-8 rounded-full mr-2"
                  alt=""
                />{" "}
                {`${vSig.userAddress.substring(0, 6)}....${vSig.userAddress.substring(
                  vSig.userAddress.length - 4,
                  vSig.userAddress.length
                )}`}
              </div>
              <div>{data.proposal.votingOptions[vSig.voteFor].option}</div>
              <div>{`${vSig.voteCount} VP`}</div>
            </li>
          ))}
        </ul>}
      {openVoteModal && (
        <VoteModal setShowModal={setOpenVoteModal} voteFor={data.proposal.votingOptions[selectedVote]} proposalHash={data.proposal.proposalHash} />
      )}
    </>
  );
};

export default Vote;