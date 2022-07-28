import { Formik } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import {
  CHOICE1_REQUIRED,
  CHOICE2_REQUIRED,
} from "../constants/errorConstants";
import "react-datepicker/dist/react-datepicker.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ethers } from "ethers";
import { BASE_URL } from '../constants/apiBase';
import axios from "axios";

const CreateVote = () => {
  const date = new Date();
  
  const { address, isConnected } = useAccount();

  const location = useLocation();

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(
    new Date(date.setDate(date.getDate() + 5))
  );
  

  const validationSchema = Yup.object({
    choice1: Yup.string().required(CHOICE1_REQUIRED),
    choice2: Yup.string().required(CHOICE2_REQUIRED),
  });
  
  const navigate = useNavigate();
  const handleSubmit = async (data) => {
    const Provider = new ethers.providers.Web3Provider(window.ethereum);
    const snapshot = await Provider.getBlockNumber();
    const proposal = {
      userAddress: address,
      proposalName: location.state.title,
      proposalDesc: location.state.message,
      proposalQuoram: 40,
      snapshotBlockNumber: snapshot,
      startTime: data.startDate.toISOString(),
      endTime: data.endDate.toISOString(),
      votingOptions: [
        { index: 0, option: data.choice1 },
        { index: 1, option: data.choice2 },
        { index: 2, option: data.choice3 }
      ]
    };

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const sign = await signer.signMessage(JSON.stringify(proposal));
    
    var config = {
      method: 'post',
      url: BASE_URL + 'proposal',
      headers: {
        'Content-Type': 'application/json'
      },
      data: { ...proposal, proposalSignature: sign }
    };

    axios(config).then(function (resp) {
      if (resp.data.status) {
        navigate('/');
      }
    }).catch(function (error) {
      console.log(error);
    });
  }

  return (
    <div>
      <>
        <div>
          <Formik
            initialValues={{
              choice1: "",
              choice2: "",
              choice3: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values) =>
              handleSubmit({ ...values, startDate, endDate })
            }
          >
            {({ values, errors, touched, handleChange, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <ul
                  className="mx-auto max-w-xl mt-5 text-lg font-medium text-gray-900  rounded-lg border border-gray-600 text-white"
                  style={{ borderColor: "#2d2d2d" }}
                >
                  <li
                    className="py-2 px-4 w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600"
                    style={{ borderColor: "#2d2d2d" }}
                  >
                    Voting
                  </li>
                  <li
                    className="flex flex-row py-2 px-4 w-full border-b border-gray-200 dark:border-gray-600"
                    style={{ borderColor: "#2d2d2d" }}
                  >
                    <div className="w-full">
                      <label
                        htmlFor="title"
                        className="block mt-5 mb-2 mx-auto max-w-2xl text-sm font-normal text-gray-400 "
                      >
                        For
                      </label>
                      <input
                        type="text"
                        id="choice1"
                        name="choice1"
                        onChange={handleChange}
                        value={values.choice1}
                        aria-describedby="helper-text-explanation"
                        className="bg-transparent border mx-auto max-w-2xl border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  border-gray-600 placeholder-gray-400  focus:ring-blue-500 focus:border-blue-500 color:black"
                        placeholder="Yes"
                      />
                      <div className="block mt-2 mx-auto max-w-2xl text-sm font-normal text-red-500">
                        {errors.choice1 && touched.choice1 && errors.choice1}
                      </div>
                      <label
                        htmlFor="title"
                        className="block mt-5 mb-2 mx-auto max-w-2xl text-sm font-normal text-gray-400 "
                      >
                        Against
                      </label>
                      <input
                        type="text"
                        id="choice2"
                        name="choice2"
                        onChange={handleChange}
                        value={values.choice2}
                        aria-describedby="helper-text-explanation"
                        className="bg-transparent border mx-auto max-w-2xl border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  border-gray-600 placeholder-gray-400  focus:ring-blue-500 focus:border-blue-500 color:black"
                        placeholder="No"
                      />
                      <div className="block mt-2 mx-auto max-w-2xl text-sm font-normal text-red-500">
                        {errors.choice2 && touched.choice2 && errors.choice2}
                      </div>
                      <label
                        htmlFor="title"
                        className="block mt-5 mb-2 mx-auto max-w-2xl text-sm font-normal text-gray-400 "
                      >
                        Abstain (Optional)
                      </label>
                      <input
                        type="text"
                        id="choice3"
                        name="choice3"
                        onChange={handleChange}
                        value={values.choice3}
                        aria-describedby="helper-text-explanation"
                        className="bg-transparent border mx-auto max-w-2xl border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  border-gray-600 placeholder-gray-400  focus:ring-blue-500 focus:border-blue-500 color:black"
                        placeholder="Abstain"
                      />
                      <div className="block mt-2 mx-auto max-w-2xl text-sm font-normal text-red-500">
                        {errors.choice3 && touched.choice3 && errors.choice3}
                      </div>
                    </div>
                  </li>
                </ul>
                <ul
                  className="mx-auto max-w-xl mt-5 text-lg font-medium text-gray-900  rounded-lg border border-gray-600 text-white"
                  style={{ borderColor: "#2d2d2d" }}
                >
                  <li
                    className="py-2 px-4 w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600"
                    style={{ borderColor: "#2d2d2d" }}
                  >
                    Voting Period
                  </li>
                  <li
                    className="flex flex-row py-2 px-4 w-full border-b border-gray-200 dark:border-gray-600"
                    style={{ borderColor: "#2d2d2d" }}
                  >
                    <div>
                      <label
                        htmlFor="title"
                        className="block mt-5 mb-2 mx-auto max-w-2xl text-sm font-normal text-gray-400 "
                      >
                        Start Date
                      </label>
                      <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        minDate={startDate}
                        showTimeSelect
                        timeFormat="p"
                        timeIntervals={15}
                        className="bg-transparent border mx-auto max-w-2xl border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  border-gray-600 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 color:black"
                        dateFormat="MMMM d, yyyy h:mm aa"
                      />
                      <div className="block mt-2 mx-auto max-w-2xl text-sm font-normal text-red-500">
                        {errors.startDate &&
                          touched.startDate &&
                          errors.startDate}
                      </div>
                    </div>
                    <div className="mx-4">
                      <label
                        htmlFor="title"
                        className="block mt-5 mb-2 mx-auto max-w-2xl text-sm font-normal text-gray-400 "
                      >
                        End Date
                      </label>
                      <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        minDate={startDate}
                        showTimeSelect
                        timeFormat="p"
                        timeIntervals={15}
                        className="bg-transparent border mx-auto max-w-2xl border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  border-gray-600 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 color:black"
                        dateFormat="MMMM d, yyyy h:mm aa"
                      />
                      <div className="block mt-2 mx-auto max-w-2xl text-sm font-normal text-red-500">
                        {errors.endDate && touched.endDate && errors.endDate}
                      </div>
                    </div>
                  </li>
                </ul>
                <div className="mx-auto block max-w-2xl mt-5">
                  { isConnected ?
                  <button
                    type="submit"
                    className="mt-5 mx-14 px-4 py-2 rounded-lg border shadow-md hover:bg-gray-100 text-white hover:text-black"
                  >
                    Create Proposal
                  </button> : <div className="block mt-10 mx-auto max-w-2xl text-sm font-normal">
                  <ConnectButton />
                </div>}
                </div>
              </form>
            )}
          </Formik>
        </div>
      </>
    </div>
  );
};

export default CreateVote;
