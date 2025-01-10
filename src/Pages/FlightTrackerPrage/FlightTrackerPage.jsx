import React, { useContext, useEffect, useState } from "react";
import { Navbar } from "../../Components/Navbar";
import { easeInOut, motion } from "framer-motion";
import FlightSearch from "../../Components/FlightSearch";
import { IoAirplaneSharp } from "react-icons/io5";
import { FaSliders } from "react-icons/fa6";
import FlightStatusCard from "../../Components/FlightStatusCard";
import { Link } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../../ContextApi/ContextApi";

const FlightTrackerPage = () => {
 
  const {latitude ,setLatitude, longitude ,setLongitude ,airports , setAirports  ,airpoartsLoading , setairpoartsLoading , formState} = useContext(AppContext)

  const [loading, setloading] = useState(false);
  const [flightloading, setflightloading] = useState(false);
 
  const [error, setError] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // getting latitude and longitude
  useEffect(() => {
    setloading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          setloading(false);
        },
        (err) => {
          setError(`Error getting location: ${err.message}`);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  // getting airpoarts information
  useEffect(() => {
    const fetchAirports = async (lat, long) => {
      try {
        setairpoartsLoading(true);
        const baseURL = "https://100085.pythonanywhere.com";
        const res = await axios.post(
          `${baseURL}/api/fligts/?type=get_airport_by_lat_long`,
          {
            latitude: lat,
            longitude: long,
            radiusMiles: formState.searchRadius,
          }
        );
        setAirports(res.data.response || []);
      } catch (err) {
        console.log(`Error fetching airports: ${err.message}`);
      } finally {
        setairpoartsLoading(false);
      }
    };

    if (latitude && longitude) {
      fetchAirports(latitude, longitude);
    }

  }, [latitude, longitude, formState.searchRadius ]);

  // { /* Loading State */}
  // if(loading) {
  //  return(
  //     <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm flex items-center justify-center z-50">
  //       <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700/50">
  //         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
  //         <p className="mt-4 text-center text-gray-300">Loading...</p>
  //       </div>
  //     </div>

  //  )

  // }

  return (
    <div className="w-full  bg-black relative  text-xl overflow-hidden px-[5vw] py-[30px] text-white">
      <div
        className="absolute top-[-500px] left-[50%] translate-x-[-50%] h-[700px] z-[0]  w-[700px] rounded-full "
        style={{
          background: "radial-gradient(circle, #579B22 0%, transparent 60%)",
        }}
      ></div>

      <Navbar />

      <div className="w-full min-h-[80px] mt-[40px] text-xl rounded-2xl bg-[var(--light-black)] relative flex justify-between items-center px-[30px]  py-[10px]">
        <div>
          <h1 className="font-semibold text-2xl max-sm:text-lg">
            Good Morning, User!
          </h1>
          <h1 className="text-sm opacity-80"> Current Location</h1>
          {loading ? (
            <motion.h1
              className="text-sm opacity-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              Searching Location<span className="ml-1">.</span>
              <motion.span
                className="ml-1"
                animate={{ opacity: [1, 0] }}
                transition={{
                  duration: 1,
                  delay: 0.11,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
              >
                .
              </motion.span>
              <motion.span
                className="ml-1"
                animate={{ opacity: [1, 0] }}
                transition={{
                  duration: 1,
                  delay: 0.33,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
              >
                .
              </motion.span>
              <motion.span
                className="ml-1"
                animate={{ opacity: [1, 0] }}
                transition={{
                  duration: 1,
                  delay: 0.66,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
              >
                .
              </motion.span>
            </motion.h1>
          ) : (
            <h1 className="text-sm">
              Lat: {latitude?.toFixed(4)} | Long: {longitude?.toFixed(4)}
            </h1>
          )}
        </div>
        <motion.button //+
          whileHover={{ scale: 1.05, opacity: 0.8 }}
          className="flex justify-center items-center font-semibold w-[200px] h-[50px] bg-[var(--primary-color-green)] rounded-xl"
        >
          {loading ? (
            <motion.h1
              className="text-base "
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              updating Location<span className="ml-1">.</span>
              <motion.span
                className="ml-1"
                animate={{ opacity: [1, 0] }}
                transition={{
                  duration: 1,
                  delay: 0.11,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
              >
                .
              </motion.span>
              <motion.span
                className="ml-1"
                animate={{ opacity: [1, 0] }}
                transition={{
                  duration: 1,
                  delay: 0.33,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
              >
                .
              </motion.span>
              <motion.span
                className="ml-1"
                animate={{ opacity: [1, 0] }}
                transition={{
                  duration: 1,
                  delay: 0.66,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
              >
                .
              </motion.span>
            </motion.h1>
          ) : (
            <h1 className="text-base">Update Location</h1>
          )}
        </motion.button>
      </div>

      {airports.length>0 && console.log(airports)}
      <FlightSearch  />

      {/* flights  */}
      <div className="w-full mt-[50px] flex justify-between items-center">
        <div className="flex items-center gap-2 mb-4">
          <IoAirplaneSharp className="text-[var(--primary-color-green)] rotate-[-45deg] text-xl" />
          <span className="text-2xl font-semibold">Flight Schedule</span>
        </div>
        <div className="relative ">
          <button onClick={toggleDropdown} className="flex items-center gap-4">
            <FaSliders />
            All Filters
          </button>
          {isDropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{
                opacity: isDropdownOpen ? 1 : 0,
                y: isDropdownOpen ? 10 : -10,
              }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, easing: easeInOut }}
              className={`absolute z-[99]  flex flex-col  top-full left-[-20%]   bg-[var(--light-black)] py-4 px-8  rounded-md shadow-xl  ${
                isDropdownOpen ? "block" : "hidden"
              }`}
            >
              <Link>Arrivals</Link>

              <Link>Departures</Link>
            </motion.div>
          )}
        </div>
      </div>

      {airpoartsLoading ? ( 
         <div className=" backdrop-blur-lg rounded-xl p-6 ">
           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-4 text-center text-gray-300">Loading...</p>
        </div>
      ):(

        
      <div className="w-full mt-[20px] ">
        <FlightStatusCard />
        <FlightStatusCard />
        <FlightStatusCard />
      </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-500/20 backdrop-blur-lg border border-red-500/50 text-red-400 px-6 py-4 rounded-xl">
          {error}
        </div>
      )}
    </div>
  );
};

export default FlightTrackerPage;
