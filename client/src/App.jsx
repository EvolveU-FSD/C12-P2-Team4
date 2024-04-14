// App.jsx
import React from "react"
import { Route, Routes } from "react-router-dom"

// import NavBar from "./components/ReusableComponents/NavBar"

// import ItineraryCard from "./components/ItineraryCard/ItineraryCard"
// import SideBar from "./components/SideBar/SideBar"
// import CalgaryMap from "./components/MapComponents/CalgaryMap"
// import Footer from "./components/Footer/Footer"
// import SearchBar from "./components/ReusableComponents/SearchBar"
import Home from "./Pages/Home/Home"
import Profile from "./Pages/Profile/Profile"
// import "./index.css"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  )
}

export default App

// <div className="nav-bar">
//   <NavBar />
// </div>
// <div className="side-bar">{/* <SideBar /> */}</div>

// <div className="map-container">
//   <div className="itinerary">
//     <ItineraryCard />
//   </div>
//   <div className="search-bar">
//     <SearchBar />
//   </div>
//   <div className="map">
//     <CalgaryMap />
//   </div>
// </div>
// <div className="footer">
//   <Footer />
// </div>
