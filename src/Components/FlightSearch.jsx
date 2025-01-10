import React, { useContext, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoAirplaneSharp } from "react-icons/io5";
import MapComponent from "./MapComponent"
import { AppContext } from "../ContextApi/ContextApi";

const AirportSearch = () => {

  const { setFormState, formState, airpoartsLoading } = useContext(AppContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSliderChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: parseInt(value),
    }));
  };

  const calculateSliderPercentage = (value) => {
    return ((value - 10) / (1000 - 10)) * 100;
  };

  return (
    <div className="flex max-md:flex-col w-full overflow-hidden  gap-4 mt-[30px] text-white text-base font-light">
      <div className="w-[40%] max-md:w-full  bg-[var(--light-black)] rounded-xl p-5 space-y-6">
        <style>
          {`

         
            input[type="date"]::-webkit-calendar-picker-indicator,
            input[type="time"]::-webkit-calendar-picker-indicator {
              filter: invert(0);
              opacity: 1;

              cursor: pointer;
            
            }
            
            input[type="date"],
            input[type="time"] {
              color-scheme: dark;
            }

            .slider-thumb {
              position: absolute;
              height: 10px;
              width: 10px;
              background: white;
              border-radius: 50%;
              top: 50%;
              right: 0;
              transform: translate(50%, -50%);
            }

             
          `}
        </style>

        <div className="space-y-1">
          <label className="block ">Date</label>
          <div className="relative">
            <input
              type="date"
              name="date"
              value={formState.date}
              onChange={handleInputChange}
              onClick={(e) => {
                e.target.showPicker();
              }}
              className="w-full border  rounded-xl bg-transparent p-3 placeholder-gray-200 focus:outline-none text-white "
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="block ">Hours</label>
          <div className="relative">
            <input
              type="time"
              name="hours"
              value={formState.hours}
              onChange={handleInputChange}
              className="w-full border  rounded-xl bg-transparent p-3 placeholder-gray-200 focus:outline-none text-white "
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="  flex justify-between items-center">
            <h1>Search Radius (km):</h1>
            <h1> {formState.searchRadius}</h1>
          </label>
          <div className="relative pt-1">
            <div className="h-1 bg-[#579B22]/20 rounded-full">
              <div
                className="absolute h-1 bg-[var(--primary-color-green)] rounded-full"
                style={{
                  width: `${calculateSliderPercentage(
                    formState.searchRadius
                  )}%`,
                }}
              >
                <div className="slider-thumb"></div>
              </div>
            </div>
            <input
              type="range"
              name="searchRadius"
              min="10"
              max="1000"
              value={formState.searchRadius}
              onChange={handleSliderChange}
              className="absolute top-0 w-full h-1 opacity-0 cursor-pointer"
            />
            <div className="flex justify-between text-xs mt-1 text-neutral-400">
              <span>10</span>
              <span>1000</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="  flex justify-between items-center">
            <h1>Flights Per Page:</h1>
            <h1>{formState.flightsPerPage}</h1>
          </label>
          <div className="relative pt-1">
            <div className="h-1 bg-[#579B22]/20 rounded-full">
              <div
                className="absolute h-1 bg-[var(--primary-color-green)] rounded-full"
                style={{
                  width: `${calculateSliderPercentage(
                    formState.flightsPerPage
                  )}%`,
                }}
              >
                <div className="slider-thumb"></div>
              </div>
            </div>
            <input
              type="range"
              name="flightsPerPage"
              min="10"
              max="1000"
              value={formState.flightsPerPage}
              onChange={handleSliderChange}
              className="absolute top-0 w-full h-1 opacity-0 cursor-pointer"
            />
            <div className="flex justify-between text-xs mt-1 text-neutral-400">
              <span>10</span>
              <span>1000</span>
            </div>
          </div>
        </div>

        <div className="relative mt-4 flex items-center gap-4  p-3 border rounded-xl ">
          <FaSearch className="  " />
          <input
            type="text"
            name="searchQuery"
            value={formState.searchQuery}
            onChange={handleInputChange}
            placeholder="Search"
            className="w-full  bg-transparent   placeholder-gray-500  focus:outline-none"
          />
        </div>
      </div>

      <div className="flex-1  max-md:w-full bg-[var(--light-black)] rounded-xl p-5">
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <IoAirplaneSharp className="text-[var(--primary-color-green)] rotate-[-45deg] text-xl" />
            <span className="text-2xl font-semibold">Nearby Airports</span>
          </div>

          <div className="w-full   rounded-lg overflow-hidden mb-6">
             <MapComponent  />
          </div>

          {airpoartsLoading ? (
            <div className="flex items-center justify-center w-full h-full  text-white text-xl">
              Loading...
            </div>
          ):(

          <div className="flex  flex-wrap gap-2 ">
            {[
              "Chennai International Airport",
              "Puducherry Airport",
              "Arkonam",
              "Tirupati Airport",
              "Tambaram Air Force Station",
            ].map((airport) => (
              <button
                key={airport}
                onClick={() => console.log(`Selected airport: ${airport}`)}
                className="bg-neutral-800/50 hover:bg-neutral-700/50 px-4 py-2 text-xs border  rounded-full  transition-colors"
              >
                {airport}
              </button>
            ))}
          </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default AirportSearch;
