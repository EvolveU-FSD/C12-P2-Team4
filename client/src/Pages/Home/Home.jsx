import React, { useState } from "react";
import NavBar from "../../components/ReusableComponents/NavBar";
import CreateEvent from "../../components/CreateEvent/CreateEvent";
import CalgaryMap from "../../components/MapComponents/CalgaryMap";

import Footer from "../../components/Footer/Footer";
import "./Home.css";

export default function Home() {
  const [modalType, setModalType] = useState(null);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="home-container">
      <div className="nav-bar">
        <NavBar />
      </div>
      <div className="main-container">
        <CreateEvent setModalType={setModalType} setShowModal={setShowModal} />
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
