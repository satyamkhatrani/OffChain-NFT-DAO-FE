import React from "react";

const Details = (props) => {
  const { data } = props;
  return (
    <div>
      <div className="mx-auto max-w-2xl text-justify p-3">
        <div className=" mt-5  text-3xl font-bold text-gray-50">
          <h1>{ data.proposal.proposalName}</h1>
        </div>
        <div className="mt-5 flex flex-row">
          <button className={`${
                data.proposalStatus === "Active" ? "bg-green-500" : data.proposalStatus==="Closed" ? "bg-violet-600" : "bg-gray-600"
              } hover:bg-blue-700 text-white font-bold  px-2 rounded-full`}>
            {data.proposalStatus}
          </button>
          <img
            src="https://mdbootstrap.com/img/new/standard/city/041.jpg"
            className=" h-6 w-6 ml-2 rounded-full"
            alt=""
          />
          <p className=" font-medium text-gray-400 ml-2">
            Proposal by {data.proposal.userAddress}
          </p>
          {/* <button className=" hover:bg-blue-700 text-gray-400 font-bold  px-1 rounded-full">
            Core
          </button> */}
        </div>
        <div>
          <p className=" font-medium text-xl text-gray-400 mt-5">
            {data.proposal.proposalDesc}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Details;
