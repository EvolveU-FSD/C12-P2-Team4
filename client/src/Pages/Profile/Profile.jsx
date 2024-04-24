import React from "react"

import NavBar from "../../components/ReusableComponents/NavBar"
import SideBar from "../../components/SideBar/SideBar"
import Footer from "../../components/Footer/Footer"
import UserProfile from "../../components/UserProfile/UserProfile"
import "../../index.css"

export default function Profile() {
  return (
    <>
      <NavBar />
      {/* <SideBar /> */}
      <section className="profile bg-secondary-gold flex-1 flex-col gap-6 px-5 py-6 ">
        <div>
          <i className="fa-solid fa-pen-to-square"></i>
        </div>

        <div>
          <UserProfile />
        </div>
      </section>
      <Footer />
    </>
  )
}
