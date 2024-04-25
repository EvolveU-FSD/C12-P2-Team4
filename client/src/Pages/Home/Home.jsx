import React, { useState } from "react"
import NavBar from "../../components/ReusableComponents/NavBar"
import CalgaryMap from "../../components/MapComponents/CalgaryMap"
import Footer from "../../components/Footer/Footer"
import "./Home.css"
import Events from "../../components/Events/Events"
import NavMenu from "../../components/Navigation/NavMenu"

export default function Home() {
  const [modalType, setModalType] = useState(null)
  const [showModal, setShowModal] = useState(false)

  return (
    <div className="home-container">
      <div className="nav-bar">
        <NavMenu />
      </div>

      <div className="map-container flex flex-row">
        <Events />
        <div className="map">
          <CalgaryMap />
        </div>
      </div>

      <div className="footer">
        <Footer />
      </div>
    </div>
  )
}
