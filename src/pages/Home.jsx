import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar.jsx";
import Card from "../components/Card";
import { Sidebar } from "../components/Sidebar";
import Heading from "../components/Heading.jsx";
import axios from "axios";
import {BASE_URL} from '../constants/apiBase.js';

const Home = () => {
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    axios.get(BASE_URL + 'proposal').then(res => {
      setProposals(res.data.data);
    }).catch(err => {
      console.log('ERROR',err);
    });
  }, []);

  return (
    <div>
      <Navbar />
      <div className="flex flex-col md:flex-row justify-center">
        <div>
          <Sidebar />
        </div>
        <div
          className="flex flex-col overflow-y-auto px-5"
          style={{ maxHeight: "92vh" }}
        >
          <Heading />
          {proposals.map((proposal, index) => {
            return (<Card key={index+''} data={proposal} />)
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
