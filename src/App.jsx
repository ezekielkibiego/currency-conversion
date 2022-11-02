// import { useState, useEffect } from 'react'
// import './App.css'
// import CurrencyRow from './CurrencyRow'

import { useEffect, useState } from "react";
import Axios from "axios";
import Dropdown from "react-dropdown";
import { HiSwitchHorizontal } from "react-icons/hi";
import "react-dropdown/style.css";
import "./App.css";

function App() {
  // Initializing all the state variables
  const [info, setInfo] = useState([]);
  const [input, setInput] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [options, setOptions] = useState([]);
  const [output, setOutput] = useState(0);
  const [amount, setAmount] = useState("");

  // Calling the api whenever the dependency changes
  useEffect(() => {
    Axios.get(
      `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}.json`
    ).then((res) => {
      setInfo(res.data[from]);
    });
  }, [from]);

  // Calling the convert function whenever
  // a user switches the currency
  useEffect(() => {
    setOptions(Object.keys(info));
    convert();
  }, [info]);

  // Function to convert the currency
  function convert() {
    var rate = info[to];
    setOutput(input * rate);
  }

  // Function to switch between two currency
  function flip() {
    var temp = from;
    setFrom(to);
    setTo(temp);
  }

  return (
    <div className="bg-gray-100">
      <div className="max-w-4xl  m-auto pb-6 pt-14">
      <div className="pt-14 bg-white pb-10 px-6 shadow">
        <h1 className="text-black text-3xl mb-10 font-semibold">
          Currency Conversion
        </h1>
        <div className="flex flex-row md-6 gap-9 items-center">
        <div className="flex-1">
            <label className="font-bold text-sm mb-3 block" htmlFor="text">
              To
            </label>
            <Dropdown className="uppercase"
              options={options}
              onChange={(e) => {
                setTo(e.value);
              }}
              value={to}
              placeholder="To"
            />
          </div>
          <div className="">
            <div
              className="border-2 border-blue-100 rounded-full p-4 cursor-pointer hover:border-green-300 "
              onClick={() => {
                flip();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 17"
                aria-hidden="true"
                className="w-4 h-4 text-green-500 miscellany___StyledIconSwap-sc-1r08bla-1 fZJuOo"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M11.726 1.273l2.387 2.394H.667V5h13.446l-2.386 2.393.94.94 4-4-4-4-.94.94zM.666 12.333l4 4 .94-.94L3.22 13h13.447v-1.333H3.22l2.386-2.394-.94-.94-4 4z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
          </div>
          <div className="flex-1">
            <label className="font-bold text-sm mb-3 block" htmlFor="text">
              From
            </label>
            <Dropdown className="uppercase"
              options={options}
              onChange={(e) => {
                setFrom(e.value);
              }}
              value={from}
              placeholder="From"
            />
          </div>
          {/* <div className="switch">
          <HiSwitchHorizontal size="30px" 
                        onClick={() => { flip()}}/>
        </div> */}
          
        

          <div className="flex-1">
            <label className="font-bold text-sm mb-3 block" htmlFor="text">
              Amount
            </label>
            <input
              type="text"
              className="focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 w-full border-2 rounded-md min-h-50 pl-3 pr-10 py-2"
              size="lg"
              value={input}
              placeholder="Enter amount"
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
        </div>

        <div className=" my-3 mt-8 ">
          
          <button 
            className={
             // !input
              //</div>  ? "cursor-not-allowed inline-flex justify-center py-3 px-5 border border-transparent shadow-sm text-md font-bold rounded-md text-white bg-gray-300"
                 "inline-flex justify-center py-3 px-5 border border-transparent shadow-sm text-md font-bold rounded-md text-white bg-green-500 hover:bg-green-600"
            }
            onClick={() => {
              convert();
            }}
          >
            Convert
          </button>
          <div className="mt-8">
            <h1 className="text-green-500 text-semibold text-2xl">Result</h1>
            <p className="text-bold text-2xl uppercase" >{input + " " + from + " = " + output.toFixed(2) + " " + to}</p>
          </div>
        </div>
      </div>
    </div>
    </div>

    // <div className="max-w-4xl m-auto pb-6 pt-14">
    //   <CurrencyRow/>
    // </div>
  );
}

export default App;
