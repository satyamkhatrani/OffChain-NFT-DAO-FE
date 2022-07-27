import React from "react";
import { NavLink } from "react-router-dom";
import { MdCheck } from "react-icons/md";

const Card = (props) => {
  const { data } = props;
  console.log('data: ', data);

  const currentTime = (new Date()).getTime() / 1000;
  const startTime = (new Date(data.startTime)).getTime() / 1000;
  const endTime = (new Date(data.endTime)).getTime() / 1000;
  const proposalStatus = (currentTime < startTime) ? "Pending" : (currentTime > startTime && endTime > currentTime) ? "Active" : "Closed";  
  function countdown(s) {
    const d = Math.floor(s / (3600 * 24));
    s -= d * 3600 * 24;
    const h = Math.floor(s / 3600);
    s -= h * 3600;
    const m = Math.floor(s / 60);
    s -= m * 60;
    const tmp = [];
    (d) && tmp.push(d + 'd');
    (d || h) && tmp.push(h + 'h');
    (!d || m) && tmp.push(m + 'm');
    return tmp.join(' ');
  }
  const time = proposalStatus === "Pending" ? countdown(startTime - currentTime) : proposalStatus === "Active" ? countdown(endTime - currentTime) : '';
  const timeRemaining = proposalStatus === "Pending" ? `Started in ${time}` : proposalStatus === "Active" ? `Ended in ${time}` : 'Ended';

  return (
    <div>
      <NavLink to={`Details/${data.proposalHash}`}>
        <div
          className="block p-6 m-2 max-w-2xl rounded-lg border shadow-md hover:bg-gray-700"
          style={{ borderColor: "#2d2d2d" }}
        >
          <div className="mb-3 flex flex-row justify-between">
            <div className="flex flex-row">
              {/* <img src={data.image} className=" h-6 w-6 rounded-full" alt="img" /> */}
              <p className=" font-medium text-gray-400 ml-2">
                Proposal by{" "}
                {`${data.userAddress.substring(
                  0,
                  6
                )}....${data.userAddress.substring(
                  data.userAddress.length - 4,
                  data.userAddress.length
                )}`}
              </p>
              {/* <button className=" hover:bg-blue-700 text-gray-400 font-bold  px-1 rounded-full">
              Core
            </button> */}
            </div>
            <button
              className={`${
                proposalStatus === "Active" ? "bg-green-500" : proposalStatus==="Closed" ? "bg-violet-600" : "bg-gray-600"
              } text-white font-bold  px-3 rounded-full  h-fit`}
            >
              {proposalStatus}
            </button>
          </div>
          <h5 className="mb-2 text-2xl font-bold tracking-tight  text-white group-hover:text-gray-400">
            {data.proposalName}
          </h5>
          <p className="font-normal text-gray-400">{`${data.proposalDesc.substring(0, 140)}...`}</p>
          <div className="flex flex-row">
            {proposalStatus === "Closed" && <MdCheck style={{
              color: 'green', fontSize: "20px", alignSelf: "center",
              margin: "5px"
            }} />}
            <p className="font-normal text-gray-400">{timeRemaining}</p>
            </div>
        </div>
      </NavLink>
    </div>
  );
};

export default Card;
