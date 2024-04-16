import React from "react"
import NavBar from "../../components/ReusableComponents/NavBar"
import SideBar from "../../components/SideBar/SideBar"
import Footer from "../../components/Footer/Footer"
import UserProfile from "../../components/UserProfile/UserProfile"
import Calendar from "../Calendar/Calendar"

export default function Profile() {
  return (
    <>
      <NavBar />
      {/* <SideBar /> */}
      <section className="profile flex-1 flex-col gap-6 px-5 py-6">
        <h1>Profile</h1>
        <div>{/* <Calendar /> */}</div>
        <div>
          <UserProfile />
        </div>
      </section>
      <Footer />
    </>
  )
}
