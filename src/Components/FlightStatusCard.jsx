import React from "react";
import directFlight from "../assets/images/directFlight.svg";

function FlightStatusCard() {
  return (
    <div className="bg-[var(--light-black)] flex max-md:flex-col-reverse mb-4 justify-between  max-md:items-end relative w-full text-white rounded-xl p-6 ">
     
      <div className="flex w-[600px] max-md:w-full items-center justify-between">
        {/* Left side - Departure */}
        <div className="space-y-1">
          <div className="text-xl">Monday</div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl">05:45</span>
            <span className="text-xl text-gray-400">AM</span>
          </div>
          <div className="text-[var(--primary-color-green)] pt-3 text-2xl font-semibold">
            BLR
          </div>
          <div className="text-xl">Bengaluru</div>
        </div>

        {/* Middle - Duration and Flight Type */}
        <div className="flex flex-col items-center -mt-4 px-4">
          <div className="text-xl text-gray-400 mb-2">Duration 1h 30m</div>
          <div className="w-full flex items-center gap-2">
            <img src={directFlight} alt="" />
          </div>
          <div className="text-xl text-gray-400 mt-2">Direct</div>
        </div>

        {/* Right side - Arrival */}
        <div className="space-y-1">
          <div className="text-xl">Monday</div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl">07:15</span>
            <span className="text-xl text-gray-400">AM</span>
          </div>
          <div className="text-[var(--primary-color-green)] pt-3 text-2xl font-semibold">
            KUL
          </div>
          <div className="text-xl">Kuala Lumpur</div>
        </div>
      </div>
      {/* Status Badge  */}
      <div className=" mb-4 ">
        <span className="bg-[#579B22]/10 text-[var(--primary-color-green)] text-base px-3 py-1 rounded-full">
          Landed
        </span>
        {/* <span className="bg-[#af4c4c]/10 text-[#af4c4c] text-xl px-3 py-1 rounded-full">
          Not Landed
        </span> */}
      </div>
    </div>
  );
}

export default FlightStatusCard;
