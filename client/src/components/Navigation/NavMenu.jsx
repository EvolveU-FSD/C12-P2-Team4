import React, { useContext, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom" // Import useNavigate
import UserAuth from "../SignIn/SignIn"
import { AuthContext } from "../Auth/AuthProvider"
import {
  Bars3Icon,
  CalendarIcon,
  PhotoIcon,
  GlobeAmericasIcon,
  MapIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline"
import { ToastContainer, toast } from "react-toastify"
import "../SignIn/signin.css"
import { css } from "glamor"

function NavMenu() {
  const { auth, _id, logout } = useContext(AuthContext)
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const onArtPage = location.pathname === "/publicart"
  const onCalendarPage = location.pathname === "/calendar"
  const onHomePage = location.pathname === "/"
  const onProfilePage = location.pathname === "/profile"

  const openModal = (type) => {
    setModalType(type)
    setShowModal(true)
  }

  const handleLogout = () => {
    logout() // Call the logout function from AuthContext
    navigate("/")
    setMenuOpen(false) // Close the menu upon logging out
  }

  return (
    <nav className="sticky top-0 z-40 bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent w-full text-secondary-gold gap-4 flex flex-row justify-between px-8 py-6">
      <div>
        <Link to="/">
          <img
            src="../../../public/assets/images/Eh-Travler-Logo-removebg.png"
            alt="logo"
            className="w-1 h-2"
          />
          {/* <i className="fa-solid fa- text-3xl m-1 mt-8">
            EH <i className="fa-solid fa-plane text-5xl text-primary-red "></i>{" "}
            Traveller
          </i> */}
        </Link>
      </div>

      <div className="ml-auto w-fulll flex flex-col justify-start text-primary-orange">
        <button className="p-2 " onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? (
            <XMarkIcon className="h-8 w-8" />
          ) : (
            <Bars3Icon className="h-8 w-8" />
          )}
        </button>
        {menuOpen && (
          <ul className="absolute right-0 top-full mt-2 w-48 bg-white shadow-lg rounded-lg">
            {!auth ? (
              <>
                <li>
                  <Link to="/signin">Sign In</Link>
                </li>
                <li>
                  <Link to="/signup">Sign Up</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/publicart">Art</Link>
                </li>
                <li>
                  <Link to="/calendar">Calendar</Link>
                </li>
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </>
            )}
          </ul>
        )}
      </div>
    </nav>
  )
}
export default NavMenu
