// App.jsx
import React from "react"
import SignIn from "./components/Signin/SignIn"
import ItineraryCard from "./components/ItineraryCard/ItineraryCard"
import SideBar from "./components/SideBar/SideBar"
import CalgaryMap from "./components/MapComponents/Map"
import Footer from "./components/Footer/Footer"
import SearchBar from "./components/ReusableComponents/SearchBar"
import SignUp from "./components/SignUp/SignUp"
import "./index.css"

const App = () => {
  return (
    <>
      <div className="signin">
        {/* <SideBar /> */}
        <SignIn />
        <SignUp />
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
  )
}

export default App
