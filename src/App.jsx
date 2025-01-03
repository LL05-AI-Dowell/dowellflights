import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import WelcomePage from "./Pages/Welcome/WelcomePage";

const App = () => {
  return (
    <>
      <Toaster reverseOrder={false} />
      <Routes>
        <Route path="/" element={<WelcomePage />} />
      </Routes>
    </>
  );
};

export default App;
