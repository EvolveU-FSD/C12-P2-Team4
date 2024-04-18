import React, { useState } from "react";
import NavBar from "../../components/ReusableComponents/NavBar";
import ItineraryCard from "../../components/ItineraryCard/ItineraryCard";
import ItineraryContext from "../../contexts/ItineraryContext";
import CalgaryMap from "../../components/MapComponents/CalgaryMap";
import Calendar from "../Calendar/CalendarTwo";

import Footer from "../../components/Footer/Footer";

export default function Home() {
  const [selectedMarker, setSelectedMarker] = useState(null);

  return (
    <div className="home-container">
      <ItineraryContext.Provider value={{ selectedMarker, setSelectedMarker }}>
        <div className="nav-bar">
          <NavBar />
        </div>
        <div className="side-bar">{/* <SideBar /> */}</div>
        <div className="calendar">
          <Calendar />
        </div>
        <div className="map-container">
          <div className="itinerary">
            <ItineraryCard />
          </div>
          <div className="map-container">
            <div className="search-bar"></div>
            <div className="map">
              <CalgaryMap />
            </div>
          </div>
        </div>

        <div className="footer">
          <Footer />
        </div>
      </ItineraryContext.Provider>
    </div>
  );
}
