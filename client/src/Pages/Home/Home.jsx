import React, { useState } from "react";
import NavBar from "../../components/ReusableComponents/NavBar";
import ItineraryCard from "../../components/ItineraryCard/ItineraryCard";
import CalgaryMap from "../../components/MapComponents/CalgaryMap";
import Calendar from "../Calendar/CalendarTwo";
import { MapContext } from "../../contexts/MapContext";
import Footer from "../../components/Footer/Footer";
import "./Home.css";

export default function Home() {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [markers, setMarkers] = useState([]);

  const handleAddMarker = (art) => {
    setMarkers((prevMarkers) => [
      ...prevMarkers,
      { lat: art.lat, lng: art.lng },
    ]);
  };

  return (
    <div className="home-container">
      <MapContext.Provider value={{ markers, handleAddMarker }}>
        <div className="nav-bar">
          <NavBar />
        </div>

        <div className="map-container">
          <ItineraryCard />
          <div className="map">
            <CalgaryMap />
          </div>
        </div>

        <div className="footer">
          <Footer />
        </div>
      </MapContext.Provider>
    </div>
  );
}
