import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import App from "./App.tsx";
import AIAssistance  from "./routes/AIAssistance .tsx";
import Charts from "./routes/Charts.tsx";
import Favorites from "./routes/Favorites.tsx";
import AirQuality from "./routes/AirQuality.tsx";
import Dashboard from "./components/Dashboard.tsx";
import { CityProvider } from "./context/CityContext.tsx";
import { AIProvider } from "./context/AIContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AIProvider>
        <CityProvider>
          <Routes>
            <Route element={<App />}>
              <Route index element={<Dashboard />} />
              <Route path="ai-assistance" element={<AIAssistance  />} />
              <Route path="charts" element={<Charts />} />
              <Route path="saved-location" element={<Favorites />} />
              <Route path="air-quality" element={<AirQuality />} />
            </Route>
          </Routes>
        </CityProvider>
      </AIProvider>
    </BrowserRouter>
  </StrictMode>
);
