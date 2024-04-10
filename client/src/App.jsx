// App.jsx
import React from "react"
import Calendar from "./Pages/Calendar/Calendar"
import UserProfile from "./components/UserProfile/UserProfile"
import SignIn from "./components/Signin/SignIn"
// import Explore from "./components/Explore/Explore"
import SideBar from "./components/SideBar/SideBar"
// import SignUp from "./components/SignUp.jsx/SignUp"

// import Profile from "./components/Profile/Profile"
// import UserProfile from "./components/UserProfile/UserProfile"
// import { UserCard } from "./components/UserCard/UserCard"
// import MapComponent from "./components/MapComponents/MapComponent"
// import ItineraryCard from "./components/ItineraryCard/ItineraryCard"

const App = () => {
  return (
    <>
      <div className="card">
        <SideBar />
      </div>

      <div className="map">{/* <MapComponent /> */}</div>
    </>
  )
}

export default App
