import React, { useState } from "react";
import NavBar from "../../components/ReusableComponents/NavBar";
import ItineraryCard from "../../components/ItineraryCard/ItineraryCard";
import CalgaryMap from "../../components/MapComponents/CalgaryMap";
import Calendar from "../Calendar/CalendarTwo";
import Footer from "../../components/Footer/Footer";
import "./Home.css";
import Itinerary from "../../components/ItineraryCard/Itinerary";
import Events from "../../components/Events/Events";

export default function Home() {
  const [modalType, setModalType] = useState(null);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="home-container">
      <div className="nav-bar">
        <NavBar />
      </div>

      <div className="map-container">
        <Events />
        <ItineraryCard />
        <div className="map">
          <CalgaryMap />
        </div>
      </div>

      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}
