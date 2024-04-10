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
      {/* <h1>DAY PLANNER</h1> */}
      {/* <Calendar /> */}
      <SideBar />
    </>
    // <div className="app">
    //   <h1>Explore</h1>
    //   {/* <UserProfile /> */}
    //   <SignIn />
    //   {/* <SignUp /> */}
    //   <Calendar />
    // </div>
  )
}

export default App
