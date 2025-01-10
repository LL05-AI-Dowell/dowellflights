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
        <Route path="/" element={<WelcomePage />} />
        <Route path="/flightTrackerPage" element={<FlightTrackerPage />} />
        <Route path="/manishapp" element={<Appmanish />} />

      </Routes>
    </>
  );
};

export default App;
