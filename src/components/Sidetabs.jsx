import React from "react";

const Sidetabs = (props) => {
  const { data } = props;
  const totalVotes = data.voteCounts;

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
            <a
              className="text-white"
              href={`https://gateway.pinata.cloud/ipfs/${data.proposalHash}`}
            >{`#${data.proposalHash.substring(0, 8)}`}</a>
          </li>
          <li
            className="flex flex-row justify-between py-2 px-4 w-full border-b border-gray-600"
            style={{ borderColor: "#2d2d2d" }}
          >
            <div style={{ color: "#8b949e" }}>Start date</div>
            <div className="text-white">{`${new Date(
              data.startTime
            ).toLocaleString("en-IN", {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
            })}`}</div>
          </li>
          <li
            className="flex flex-row justify-between py-2 px-4 w-full border-b border-gray-600"
            style={{ borderColor: "#2d2d2d" }}
          >
            <div style={{ color: "#8b949e" }}>End date</div>
            <div className="text-white">{`${new Date(
              data.endTime
            ).toLocaleString("en-IN", {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
            })}`}</div>
          </li>
          <li
            className="flex flex-row justify-between py-2 px-4 w-full border-b border-gray-600"
            style={{ borderColor: "#2d2d2d" }}
          >
            <div style={{ color: "#8b949e" }}>Snapshot</div>
            <div className="text-white">{`${parseInt(
              data.snapshotBlockNumber
            ).toLocaleString()}`}</div>
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
          {data.votingOptions.map((opts, index) => {
            const percentage = ((opts.count * 100) / totalVotes).toFixed(2);
            return (
              opts.option !== "" && (
                <li
                  key={index}
                  className=" py-2 px-4 w-full border-b border-gray-600"
                  style={{ borderColor: "#2d2d2d" }}
                >
                  <div className="flex flex-row justify-between">
                    <div>{opts.option.substring(0, 10) + "..."}</div>
                    <div>{opts.count} VP</div>
                    <div>
                      {totalVotes > 0 && opts.count > 0 ? percentage : 0}%
                    </div>
                  </div>
                  <div>
                    <progress
                      className="w-full rounded h-1 "
                      id="file"
                      value={totalVotes > 0 && opts.count > 0 ? percentage : 0}
                      max="100"
                    ></progress>
                  </div>
                </li>
              )
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Sidetabs;
