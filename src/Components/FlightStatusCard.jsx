import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Plane,
  Clock,
  DoorOpen,
  BaggageClaim,
  // Baggage,
  // Gate,
} from "lucide-react";
import directFlight from "../assets/images/directFlight.svg"

const FlightStatusCard = ({ flight }) => {
  const [showDetails, setShowDetails] = useState(false);

  const formatMinutesToHoursAndMinutes = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  const calculateRemainingTime = (scheduledBlockMinutes, taxiOutMinutes) => {
    const remainingMinutes = scheduledBlockMinutes - taxiOutMinutes;
    return formatMinutesToHoursAndMinutes(remainingMinutes);
  };

  const getDelayInfo = () => {
    if (!flight.delays) return null;
    const delays = [];
    if (flight.delays.departureGateDelayMinutes) {
      delays.push(
        `Departure delayed by ${flight.delays.departureGateDelayMinutes} minutes`
      );
    }
    if (flight.delays.arrivalGateDelayMinutes) {
      delays.push(
        `Arrival delayed by ${flight.delays.arrivalGateDelayMinutes} minutes`
      );
    }
    return delays;
  };

  return (
    <div
      className={`bg-[var(--light-black)] w-full text-white rounded-xl p-6 mb-4 transition-all duration-300 ease-in-out ${
        showDetails ? "h-auto" : "h-auto"
      }`}
    >
      <div className="w-full flex justify-between">
        <span className="text-xl font-semibold text-blue-400">
          {flight.carrierFsCode} {flight.flightNumber}
        </span>

        <div className="mb-4">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              flight.status === "L"
                ? "bg-[#579B22]/10 text-[var(--primary-color-green)]"
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

      <div className="bg-[var(--light-black)]   relative">
        <div className="flex w-[80%]  max-md:w-full items-center justify-between">
          <div className="space-y-1">
            <div className="text-base text-gray-400">
              {new Date(flight.departureDate.dateLocal).toLocaleDateString()}
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl">
                {new Date(flight.departureDate.dateLocal).toLocaleTimeString(
                  "en-US",
                  { hour: "2-digit", minute: "2-digit" }
                )}
              </span>
            </div>
            <div className="text-[var(--primary-color-green)] pt-2  text-3xl font-semibold">
              {flight.departureAirportFsCode}
            </div>
            <div className="text-xl">Bengaluru</div>
          </div>

          <div className="flex flex-col items-center  px-4">
            <div className="text-base text-gray-400 mb-2">
              Duration
              <span className="text-white">
                {" "}
                :{" "}
                {formatMinutesToHoursAndMinutes(
                  flight.flightDurations.scheduledBlockMinutes
                )}
              </span>
            </div>

            <div className="w-full flex items-center gap-2 my-1 ">
              <img className="w-full h-[40px]" src={directFlight} alt="" />
            </div>
            {flight.flightDurations.taxiOutMinutes && (
              <div className="text-base text-gray-400 mb-2">
                Remaining Time
                <span className="text-white">
                  {" "}
                  :{" "}
                  {calculateRemainingTime(
                    flight.flightDurations.scheduledBlockMinutes,
                    flight.flightDurations.taxiOutMinutes
                  )}
                </span>
              </div>
            )}
            <div className="text-base text-gray-400 ">Direct</div>
          </div>

          <div className="space-y-1 ">
            <div className="text-base text-gray-400">
              {new Date(flight.arrivalDate.dateLocal).toLocaleDateString()}
            </div>
            <div className="flex  items-baseline gap-2">
              <span className="text-xl">
                {new Date(flight.arrivalDate.dateLocal).toLocaleTimeString(
                  "en-US",
                  { hour: "2-digit", minute: "2-digit" }
                )}
              </span>
            </div>
            <div className="text-[var(--primary-color-green)] pt-2  text-3xl font-semibold">
              {flight.arrivalAirportFsCode}
            </div>
            <div className="text-xl">Kuala Lumpur</div>
          </div>
        </div>
      </div>

      <div
        className={`w-full mt-4 text-base  overflow-hidden transition-all duration-300 ease-in-out ${
          showDetails ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="border-t border-gray-700 pt-4 space-y-4">
          {/* flight id */}
          <div className="flex items-center gap-2">
            <Plane className="text-gray-400" size={20} />
            <span className="text-gray-400">Flight Id:</span>
            <span className="text-blue-400">
              {flight.flightId} 
            </span>
          </div>

          {/* Flight Equipment */}
          <div className="flex items-center gap-2">
            <Plane className="text-gray-400" size={20} />
            <span className="text-gray-400">Aircraft:</span>
            <span>
              {flight.flightEquipment.actualEquipmentIataCode} -{" "}
              {flight.flightEquipment.tailNumber}
            </span>
          </div>

          {/* Terminal & Gate Information */}
          <div className="flex items-center gap-2">
            <DoorOpen className="text-gray-400" size={20} />
            <span className="text-gray-400">Gates:</span>
            <span>
              Departure: Terminal {flight.airportResources.departureTerminal},
              Gate {flight.airportResources.departureGate}
              {flight.airportResources.arrivalTerminal &&
                ` | Arrival: Terminal ${flight.airportResources.arrivalTerminal}`}
            </span>
          </div>

          {/* Baggage Information */}
          {flight.airportResources.baggage && (
            <div className="flex items-center gap-2">
              <BaggageClaim className="text-gray-400" size={20} />
              <span className="text-gray-400">Baggage Claim:</span>
              <span>{flight.airportResources.baggage}</span>
            </div>
          )}

          {/* Delays */}
          {getDelayInfo()?.length > 0 && (
            <div className="flex items-center gap-2">
              <Clock className="text-orange-400" size={20} />
              <span className="text-orange-400">Delays:</span>
              <span>{getDelayInfo().join(" | ")}</span>
            </div>
          )}

         
        </div>
      </div>

      <button
        onClick={() => setShowDetails(!showDetails)}
        className="w-full text-sm mt-2  flex items-center justify-center gap-2 text-[var(--primary-color-green)] hover:opacity-50 transition-colors duration-200"
      >
        {showDetails ? (
          <>
            <span>Show Less</span>
            <ChevronUp size={20} />
          </>
        ) : (
          <>
            <span>Show More Details</span>
            <ChevronDown size={20} />
          </>
        )}
      </button>
    </div>
  );
};

export default FlightStatusCard;
