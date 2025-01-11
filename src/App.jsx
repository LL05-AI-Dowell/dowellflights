import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import WelcomePage from "./Pages/Welcome/WelcomePage";
import FlightTrackerPage from "./Pages/FlightTrackerPrage/FlightTrackerPage";
import Appmanish from "./AppManish";

const App = () => {
  return (
    <>
      <Toaster reverseOrder={false} />
      <Routes>
        <Route path="/" element={<FlightTrackerPage />} />
        <Route path="/flightTrackerPage" element={<WelcomePage />} />
        <Route path="/manishapp" element={<Appmanish />} />

      </Routes>
    </>
  );
};

export default App;
