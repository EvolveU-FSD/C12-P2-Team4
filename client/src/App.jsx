// App.jsx
import React from "react"
import SignIn from "./components/Signin/SignIn"
import ItineraryCard from "./components/ItineraryCard/ItineraryCard"
import SideBar from "./components/SideBar/SideBar"
import CalgaryMap from "./components/MapComponents/Map"
import Footer from "./components/Footer/Footer"
import SearchBar from "./components/ReusableComponents/SearchBar"
// import Header from "./components/Home/Header"
import SignUp from "./components/SignUp/SignUp"
import "./index.css"
import { Header } from "./components/Home/Header"

const App = () => {
  return (
    <>
      <div className="Header">
        <SideBar />
      </div>

      <div className="map-container">
        <div className="search-bar">
          <SearchBar />
        </div>
        <div className="map">
          <CalgaryMap />
          <div className="itinerary">
            <ItineraryCard />
          </div>
        </div>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </>
  )
}

export default App
