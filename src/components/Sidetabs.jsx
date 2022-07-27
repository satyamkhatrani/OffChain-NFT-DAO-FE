import React from "react";

const Sidetabs = (props) => {
  const { data} = props;
  return (
    <div>
      <div>
        <ul
          className="mx-auto w-72 mt-5 font-normal  rounded-lg border border-gray-600 text-white"
          style={{ borderColor: "#2d2d2d" }}
        >
          <li
            className="py-2 px-4 w-full rounded-t-lg border-b border-gray-600"
            style={{ borderColor: "#2d2d2d" }}
          >
            information
          </li>
          <li
            className="flex flex-row justify-between py-2 px-4 w-full border-b border-gray-600"
            style={{ borderColor: "#2d2d2d" }}
          >
            <div style={{ color: "#8b949e" }}>IPFS</div>
            <a className="text-white" href={`https://gateway.pinata.cloud/ipfs/${data.proposalHash}`}>{`#${data.proposalHash.substring(0,8)}`}</a>
          </li>
          <li
            className="flex flex-row justify-between py-2 px-4 w-full border-b border-gray-600"
            style={{ borderColor: "#2d2d2d" }}
          >
            <div style={{ color: "#8b949e" }}>Start date</div>
            <div className="text-white">{`${(new Date(data.startTime)).toLocaleString('en-IN',{year:'numeric', month:'short', day:'numeric', hour:'numeric', minute:'numeric'})}`}</div>
          </li>
          <li
            className="flex flex-row justify-between py-2 px-4 w-full border-b border-gray-600"
            style={{ borderColor: "#2d2d2d" }}
          >
            <div style={{ color: "#8b949e" }}>End date</div>
            <div className="text-white">{`${(new Date(data.endTime)).toLocaleString('en-IN',{year:'numeric', month:'short', day:'numeric', hour:'numeric', minute:'numeric'})}`}</div>
          </li>
          <li
            className="flex flex-row justify-between py-2 px-4 w-full border-b border-gray-600"
            style={{ borderColor: "#2d2d2d" }}
          >
            <div style={{ color: "#8b949e" }}>Snapshot</div>
            <div className="text-white">{ `${parseInt(data.snapshotBlockNumber).toLocaleString()}`}</div>
          </li>
        </ul>
      </div>
      <div>
        <ul
          className="mx-auto w-72 mt-5 font-normal  rounded-lg border border-gray-600 text-white"
          style={{ borderColor: "#2d2d2d" }}
        >
          <li
            className="py-2 px-4 w-full rounded-t-lg border-b border-gray-600"
            style={{ borderColor: "#2d2d2d" }}
          >
            Admins
          </li>
          <li
            className=" py-2 px-4 w-full border-b border-gray-600"
            style={{ borderColor: "#2d2d2d" }}
          >
            <div>I’d stake Cake.. 19 CAKEVO.. 95.09%</div>
            <div>
              <progress
                className="w-full rounded h-1 "
                id="file"
                value="95"
                max="100"
              >
                {" "}
                95%{" "}
              </progress>
            </div>
          </li>
          <li
            className=" py-2 px-4 w-full border-b border-gray-600"
            style={{ borderColor: "#2d2d2d" }}
          >
            <div>I’d add liquidity.. 1CAKEVO.. 4.91%</div>
            <div>
              <progress
                className="w-full rounded h-1 "
                id="file"
                value="4"
                max="100"
              >
                {" "}
                4%{" "}
              </progress>
            </div>
          </li>
          <li
            className=" py-2 px-4 w-full border-b border-gray-600"
            style={{ borderColor: "#2d2d2d" }}
          >
            <div>No carbo pool.. 0CAKEVO.. 0%</div>
            <div>
              <progress
                className="w-full rounded h-1 "
                id="file"
                value="0"
                max="100"
              >
                {" "}
                0{" "}
              </progress>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidetabs;
