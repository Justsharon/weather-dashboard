import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import App from "./App.tsx";

import Charts from "./routes/Charts.tsx";
import Favorites from "./routes/Favorites.tsx";
import AirQuality from "./routes/AirQuality.tsx";
import Dashboard from "./components/Dashboard.tsx";
import { CityProvider } from "./context/CityContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <CityProvider>
        <Routes>
          <Route element={<App />}>
            <Route index element={<Dashboard />} />
            <Route path="charts" element={<Charts />} />
            <Route path="saved-location" element={<Favorites />} />
            <Route path="air-quality" element={<AirQuality />} />
          </Route>
        </Routes>
      </CityProvider>
    </BrowserRouter>
  </StrictMode>
);
