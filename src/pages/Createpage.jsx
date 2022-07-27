import React from "react";
import { Navbar } from "../components/Navbar.jsx";
import { Create } from "../components/Create.jsx";
import { Sidebar } from "../components/Sidebar.jsx";

const Createpage = () => {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col md:flex-row mx-auto justify-center">
        <div>
          <Sidebar />
        </div>
        <div
          className="flex flex-col overflow-y-auto px-5 lg:w-2/4 md:w-full"
          style={{ maxHeight: "92vh" }}
        >
          <Create />
        </div>
      </div>
    </div>
  );
};

export default Createpage;
