// App.jsx
import React from "react";
import ItineraryCard from "./components/ItineraryCard/ItineraryCard";
import SideBar from "./components/SideBar/SideBar";
import CalgaryMap from "./components/MapComponents/CalgaryMap";
import Footer from "./components/Footer/Footer";
import SearchBar from "./components/ReusableComponents/SearchBar";
import NavBar from "./components/ReusableComponents/NavBar";
import "./index.css";

const App = () => {
  return (
    <>
      <div className="nav-bar">
      </div>
      <div className="side-bar">
          {/* <SideBar /> */}
        </div>
      <div className="map-container">
        <div className="itinerary">
          <ItineraryCard />
        </div>
        <div className="search-bar">
          <SearchBar />
        </div>
        <div className="map">
          <CalgaryMap />
        </div>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </>
  );
};

export default App;
