// App.jsx
import React from "react"
import Calendar from "./Pages/Calendar/Calendar"
import UserProfile from "./components/UserProfile/UserProfile"
import SignIn from "./components/Signin/SignIn"
// import Explore from "./components/Explore/Explore"
import SideBar from "./components/SideBar/SideBar"
import Footer from "./components/Footer/Footer"
import CalgaryMap from "./components/MapComponents/Map"

// import Profile from "./components/Profile/Profile"
// import UserProfile from "./components/UserProfile/UserProfile"
// import { UserCard } from "./components/UserCard/UserCard"
// import MapComponent from "./components/MapComponents/MapComponent";
import ItineraryCard from "./components/ItineraryCard/ItineraryCard"

const App = () => {
  return (
    <>
      <div className="signin">
        <SignIn />
        {/* <SignUp /> */}
      </div>
      {/* <SignIn /> */}
      <div className="card">
        <ItineraryCard />

        {/* <SideBar /> */}
      </div>
      <div className="map-container">
        <div className="map">
          <CalgaryMap />
        </div>
      </div>

      <div className="map">
        <Footer />
      </div>
    </>
  )
}

export default App
