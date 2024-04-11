// App.jsx
import React from "react"
import SignIn from "./components/Signin/SignIn.jsx"
import ItineraryCard from "./components/ItineraryCard/ItineraryCard.jsx"
import SideBar from "./components/SideBar/SideBar.jsx"
import CalgaryMap from "./components/MapComponents/Map.jsx"
import Footer from "./components/Footer/Footer.jsx"

import SignUp from "./components/SignUp/SignUp.jsx"
import "./index.css"

const App = () => {
  return (
    <>
      <div className="signin">
        {/* <SideBar /> */}
        <SignIn />
        <SignUp />
      </div>
      {/* <SignIn /> */}
      <div className="card">{/* <ItineraryCard /> */}</div>
      {/* <div className="map-container">
        <div className="map">
          <CalgaryMap />
        </div>
      </div> */}

      <div className="footer">
        <Footer />
      </div>
    </>
  )
}

export default App
