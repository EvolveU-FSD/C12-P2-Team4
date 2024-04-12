// App.jsx
<<<<<<< HEAD
import React from "react"
import SignIn from "./components/SignIn/SignIn"
import ItineraryCard from "./components/ItineraryCard/ItineraryCard"
import SideBar from "./components/SideBar/SideBar"
import CalgaryMap from "./components/MapComponents/Map"
import Footer from "./components/Footer/Footer"
import SearchBar from "./components/ReusableComponents/SearchBar"
import SignUp from "./components/SignUp/SignUp"
import NavBar from "./components/ReusableComponents/NavBar"
import "./index.css"
=======
import React from "react";
import ItineraryCard from "./components/ItineraryCard/ItineraryCard";
// import SideBar from "./components/SideBar/SideBar";
import CalgaryMap from "./components/MapComponents/Map";
import Footer from "./components/Footer/Footer";
import SearchBar from "./components/ReusableComponents/SearchBar";
import NavBar from "./components/ReusableComponents/NavBar";
import "./index.css";
>>>>>>> 42b788f1a65a96011de828d9c94d996854361c7d

const App = () => {
  return (
    <>
      <div className="navbar">
        <NavBar />
<<<<<<< HEAD
        <div className="signin">
          <SideBar />
          <SignIn />
          <SignUp />
        </div>
=======
>>>>>>> 42b788f1a65a96011de828d9c94d996854361c7d
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
