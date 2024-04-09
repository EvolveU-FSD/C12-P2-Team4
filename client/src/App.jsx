// App.jsx
import React from "react"

import Profile from "./components/Profile/Profile"
import UserProfile from "./components/UserProfile/UserProfile"
import { UserCard } from "./components/UserCard/UserCard"
import MapComponent from "./components/MapComponents/MapComponent"

const App = () => {
  return (
    <div className="app">
      <h1>App jsx renders</h1>
      {/* <MapComponent /> */}
      <UserProfile />
      <UserCard />
      <Profile />
    </div>
  )
}

export default App
