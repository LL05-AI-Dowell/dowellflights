import { useContext, useEffect, useRef } from "react";
import { AppContext } from "../ContextApi/ContextApi";

const MapComponent = () => {
  const { latitude , longitude , airports} = useContext(AppContext)

  const mapRef = useRef(null);

  useEffect(() => {
    // Load Leaflet scripts and CSS
    const loadLeaflet = async () => {
      // Load CSS
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href =
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/leaflet.css";
      document.head.appendChild(link);

      // Load JS if not already loaded
      if (!window.L) {
        const script = document.createElement("script");
        script.src =
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/leaflet.js";
        script.async = true;

        await new Promise((resolve, reject) => {
          script.onload = resolve;
          script.onerror = reject;
          document.head.appendChild(script);
        });
      }

      // Initialize map after Leaflet is loaded
      initializeMap();
    };

    const initializeMap = () => {
      const L = window.L;

      // Set default coordinates if latitude/longitude not provided
      const defaultLat = latitude || 30;
      const defaultLng = longitude || 70;
      const zoom = latitude && longitude ? 8 : 4;

      // Initialize map
      const map = L.map("map").setView([defaultLat, defaultLng], zoom);

      // Store map instance in ref for cleanup
      mapRef.current = map;

      // Add tile layer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(map);

      // Add marker if coordinates are provided
      if (latitude && longitude) {
        L.marker([latitude, longitude]).bindPopup(`
          <b>your location</b><br>
         
        `)
        .addTo(map).addTo(map);
      }

      // Add markers for each airport
      if(airports.length > 0) {
        airports.forEach((airport) => {
          L.marker([airport.latitude, airport.longitude])
           .bindPopup(
              `
              <b>${airport.name}</b><br>
              ${airport.city}, ${airport.country}<br>
              ${airport.iataCode}<br>
              ${airport.countryCode}
              `
            )
           .addTo(map);
        });

      }else{}
    };

    loadLeaflet();

    // Cleanup function
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [latitude, longitude , airports]);

  return (
    <div className="bg-gray-800  rounded-lg">
      <div id="map" className="h-80 rounded-lg" />
    
    </div>
  );
};

export default MapComponent;
