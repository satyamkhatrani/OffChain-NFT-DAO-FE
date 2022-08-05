import React, { useEffect, useState } from "react";
import Details from "../components/Details";
import { Navbar } from "../components/Navbar";
import Vote from "../components/Vote";
import Sidetabs from "../components/Sidetabs";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../constants/apiBase";
import Loader from "../components/Loader";

const Detailspage = () => {
  const params = useParams();
  const [proposal, setProposal] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(BASE_URL + "proposal/" + params.id)
      .then((res) => {
        setProposal(res.data.data[0]);
        setLoading(false);
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  }, [params]);

  const currentTime = new Date().getTime() / 1000;
  const startTime = new Date(proposal.startTime).getTime() / 1000;
  const endTime = new Date(proposal.endTime).getTime() / 1000;
  const proposalStatus =
    currentTime < startTime
      ? "Pending"
      : currentTime > startTime && endTime > currentTime
      ? "Active"
      : "Closed";

  return (
    <div>
      <Navbar />
      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-col md:flex-row mx-auto justify-center">
          <div>
            <Details data={{ proposal, proposalStatus }} />
            <Vote data={{ proposal, proposalStatus }} />
          </div>
          <div className="ml-5">
            <Sidetabs data={proposal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Detailspage;
