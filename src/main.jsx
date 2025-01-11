import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "./ContextApi/ContextApi.jsx";

createRoot(document.getElementById("root")).render(
  
  <BrowserRouter basename="/dowellflight">
  <AppProvider>
    <App />
  </AppProvider>
  </BrowserRouter>
);
