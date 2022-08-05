import React from "react";

const About = () => {
  return (
    <div className="px-5">
      <>
        <div className="mx-auto mt-5 max-w-xl text-xl text-gray-50">
          <h1>About</h1>
        </div>
        <div
          className="mx-auto mt-2 block p-6 m-2 max-w-xl rounded-lg border shadow-md "
          style={{ borderColor: "#2d2d2d" }}
        >
          <h1 className=" text-gray-50 text-lg font-semibold">Network</h1>
          <p className="font-normal text-gray-400">Ethereum Rinkby</p>

          <h1 className=" text-gray-50 text-lg font-semibold mt-4">
            Proposal Validation
          </h1>
          <p className="font-normal text-gray-400 ">basic</p>

          <h1 className=" text-gray-50 text-lg font-semibold mt-4">
            Voting Strategy
          </h1>
          <p className="font-normal text-gray-400 ">erc721-balance-of</p>
        </div>
      </>
    </div>
  );
};

export default About;
