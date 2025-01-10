import React, { createContext, useState } from "react";

// Create the context
export const AppContext = createContext();

// Create a provider component
export const AppProvider = ({ children }) => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [airports, setAirports] = useState([]);
  const [airpoartsLoading, setairpoartsLoading] = useState(false);

   const [formState, setFormState] = useState({
     date: "",
     hours: "",
     searchRadius: 200,
     flightsPerPage: 10,
     searchQuery: "",
   });

  return (
    <AppContext.Provider
      value={{
        latitude,
        setLatitude,
        longitude,
        setLongitude,
        airports,
        setAirports,
       
        airpoartsLoading,
        setairpoartsLoading,
        formState,
        setFormState,
       
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
