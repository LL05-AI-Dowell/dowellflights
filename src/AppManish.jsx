import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Search,
  MapPin,
  Calendar,
  Clock,
  Plane,
  ArrowRight,
  Ruler,
  Users,
} from "lucide-react";

const CustomSlider = ({ value, onChange, min, max, step, label }) => {
  return (
    <div className="w-full">
      <div className="flex justify-between mb-2">
        <label className="text-sm font-medium text-gray-400">{label}</label>
        <span className="text-sm text-blue-400">{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
      />
      <div className="flex justify-between mt-1">
        <span className="text-xs text-gray-500">{min}</span>
        <span className="text-xs text-gray-500">{max}</span>
      </div>
    </div>
  );
};

const FlightStatusToggle = ({ status, onChange }) => {
  return (
    <div className="flex items-center justify-center space-x-4 bg-gray-800/60 rounded-full p-2 shadow-md">
      <button
        onClick={() => onChange("arr")}
        aria-pressed={status === "arr"}
        className={`flex-1 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-200 focus:outline-none ${
          status === "arr"
            ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg scale-105"
            : "bg-gray-700 text-gray-400 hover:bg-gray-600 hover:text-gray-200"
        }`}
      >
        Arrivals
      </button>
      <button
        onClick={() => onChange("dep")}
        aria-pressed={status === "dep"}
        className={`flex-1 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-200 focus:outline-none ${
          status === "dep"
            ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg scale-105"
            : "bg-gray-700 text-gray-400 hover:bg-gray-600 hover:text-gray-200"
        }`}
      >
        Departures
      </button>
    </div>
  );
};

const Appmanish = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [airports, setAirports] = useState([]);
  const [selectedAirport, setSelectedAirport] = useState(null);
  const [flights, setFlights] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [flightsPerPage, setFlightsPerPage] = useState(10);
  const [searchRadius, setSearchRadius] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateTime, setDateTime] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
    hour: new Date().getHours(),
  });
  const [typeOfStatus, setTypeOfStatus] = useState("arr");
  useEffect(() => {
    const fetchAirports = async (lat, long) => {
      setLoading(true);
      try {
        const baseURL = "https://100085.pythonanywhere.com";
        const res = await axios.post(
          `${baseURL}/api/fligts/?type=get_airport_by_lat_long`,
          {
            latitude: lat,
            longitude: long,
            radiusMiles: searchRadius,
          }
        );
        setAirports(res.data.response || []);
      } catch (err) {
        setError(`Error fetching airports: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    if (latitude && longitude) {
      fetchAirports(latitude, longitude);
    }
  }, [latitude, longitude, searchRadius]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (err) => {
          setError(`Error getting location: ${err.message}`);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  const fetchFlights = async (airportCode) => {
    setLoading(true);
    try {
      const baseURL = "https://100085.pythonanywhere.com";
      const res = await axios.post(
        `${baseURL}/api/fligts/?type=get_flights_arrival_departure`,
        {
          airport_code: airportCode,
          year: dateTime.year,
          month: dateTime.month,
          day: dateTime.day,
          hourOfDay: dateTime.hour,
          maxFlights: flightsPerPage,
          typeOfStatus: typeOfStatus,
        }
      );
      setFlights(res.data.response || []);
      setCurrentPage(1);
    } catch (err) {
      setError(`Error fetching flights: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleAirportSelect = (airport) => {
    setSelectedAirport(airport);
    fetchFlights(airport.fs);
  };

  const handleDateTimeChange = (e) => {
    const { name, value } = e.target;
    setDateTime((prev) => ({
      ...prev,
      [name]: parseInt(value),
    }));
  };

  const filteredFlights = flights.filter((flight) =>
    Object.values(flight).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const paginatedFlights = filteredFlights.slice(
    (currentPage - 1) * flightsPerPage,
    currentPage * flightsPerPage
  );

  const totalPages = Math.ceil(filteredFlights.length / flightsPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600">
            DoWell Flight Tracker
          </h1>
          <p className="mt-3 text-lg text-gray-400">
            Real-time flight tracking at your fingertips
          </p>
        </div>

        {

        }

        {/* Location Info */}
        {latitude && longitude && (
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700/50">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-full bg-blue-500/20">
                <MapPin className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <p className="text-gray-400">Current Location</p>
                <p className="font-medium text-gray-200">
                  Lat: {latitude.toFixed(4)} | Long: {longitude.toFixed(4)}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Search Parameters Card */}
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700/50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Sliders Section */}
            <div className="space-y-6">
              <CustomSlider
                label="Search Radius (km)"
                value={searchRadius}
                onChange={setSearchRadius}
                min={10}
                max={1000}
                step={10}
              />
              <CustomSlider
                label="Flights Per Page"
                value={flightsPerPage}
                onChange={setFlightsPerPage}
                min={10}
                max={100}
                step={10}
              />
            </div>

            {/* DateTime Section */}
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                name="year"
                value={dateTime.year}
                onChange={handleDateTimeChange}
                className="bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-gray-200 focus:outline-none focus:border-blue-500"
                placeholder="Year"
              />
              <input
                type="number"
                name="month"
                value={dateTime.month}
                onChange={handleDateTimeChange}
                min="1"
                max="12"
                className="bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-gray-200 focus:outline-none focus:border-blue-500"
                placeholder="Month"
              />
              <input
                type="number"
                name="day"
                value={dateTime.day}
                onChange={handleDateTimeChange}
                min="1"
                max="31"
                className="bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-gray-200 focus:outline-none focus:border-blue-500"
                placeholder="Day"
              />
              <input
                type="number"
                name="hour"
                value={dateTime.hour}
                onChange={handleDateTimeChange}
                min="0"
                max="23"
                className="bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-gray-200 focus:outline-none focus:border-blue-500"
                placeholder="Hour"
              />
            </div>
          </div>

          {/* Search Input */}
          <div className="mt-6">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-gray-200 focus:outline-none focus:border-blue-500"
                placeholder="Search flights..."
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>

        <FlightStatusToggle status={typeOfStatus} onChange={setTypeOfStatus} />

        {/* Airports Grid */}
        {airports.length > 0 && (
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700/50">
            <div className="flex items-center space-x-2 mb-6">
              <Plane className="w-5 h-5 text-blue-400" />
              <h2 className="text-xl font-semibold text-gray-200">
                Nearby Airports
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {airports.map((airport) => (
                <button
                  key={airport.fs}
                  onClick={() => handleAirportSelect(airport)}
                  className={`p-4 rounded-lg transition-all duration-200 ${
                    selectedAirport?.fs === airport.fs
                      ? "bg-blue-500/20 border border-blue-500"
                      : "bg-gray-700/30 border border-gray-700 hover:border-gray-600"
                  }`}
                >
                  {console.log(flights)}
                  <div className="font-medium text-gray-200">
                    {airport.name}
                  </div>
                  <div className="text-sm text-gray-400">{airport.iata}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Flights List */}
        {flights.length > 0 && (
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700/50">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-blue-400" />
                <h2 className="text-xl font-semibold text-gray-200">
                  Flight Schedule
                </h2>
              </div>
              <span className="text-sm text-gray-400">
                Showing {paginatedFlights.length} of {filteredFlights.length}{" "}
                flights
              </span>
            </div>

            <div className="space-y-4">
              {paginatedFlights.map((flight) => (
                <div
                  key={flight.flightId}
                  className="bg-gray-700/30 border border-gray-700 hover:border-gray-600 rounded-lg p-4 transition-all duration-200"
                >
                  <div className="flex justify-between items-start">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <span className="text-lg font-semibold text-blue-400">
                          {flight.carrierFsCode} {flight.flightNumber}
                        </span>
                        <div className="flex items-center text-gray-400">
                          <span>{flight.departureAirportFsCode}</span>
                          <ArrowRight className="w-4 h-4 mx-2" />
                          <span>{flight.arrivalAirportFsCode}</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-400">Departure</p>
                          <p className="font-medium text-gray-200">
                            {new Date(
                              flight.departureDate.dateLocal
                            ).toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-400">Arrival</p>
                          <p className="font-medium text-gray-200">
                            {new Date(
                              flight.arrivalDate.dateLocal
                            ).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          flight.status === "L"
                            ? "bg-green-500/20 text-green-400"
                            : flight.status === "A"
                            ? "bg-blue-500/20 text-blue-400"
                            : flight.status === "S"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : flight.status === "D"
                            ? "bg-orange-500/20 text-orange-400"
                            : flight.status === "C"
                            ? "bg-red-500/20 text-red-400"
                            : flight.status === "R"
                            ? "bg-purple-500/20 text-purple-400"
                            : flight.status === "U"
                            ? "bg-gray-500/20 text-gray-400"
                            : "bg-gray-600/50 text-gray-300"
                        }`}
                      >
                        {(() => {
                          switch (flight.status) {
                            case "L":
                              return "Landed";
                            case "A":
                              return "In Flight";
                            case "S":
                              return "Scheduled";
                            case "D":
                              return "Departed";
                            case "C":
                              return "Cancelled";
                            case "R":
                              return "Redirected";
                            case "U":
                              return "Unknown";
                            default:
                              return flight.status;
                          }
                        })()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 10 && (
              <div className="flex justify-center space-x-4 mt-8">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-200 hover:bg-gray-600/50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <span className="flex items-center text-gray-400">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-200 hover:bg-gray-600/50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700/50">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-4 text-center text-gray-300">Loading...</p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/20 backdrop-blur-lg border border-red-500/50 text-red-400 px-6 py-4 rounded-xl">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default Appmanish;
