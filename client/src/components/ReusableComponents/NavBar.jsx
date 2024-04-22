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
import "../SignIn/signin.css"

function NavBar() {
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
  }

  return (
    <nav className="sticky top-0 z-40 bg-primary-night w-full text-secondary-gold gap-4 flex flex-row px-8 py-6 ">
      <div className="font-bold">
        <Link to="/">
          <i className="fa-solid fa- text-3xl">
            EH <i className="fa-solid fa-plane text-5xl text-primary-red "></i>{" "}
            Traveller
          </i>
        </Link>
      </div>
      <div className="mx-auto flex gap-12 justify-around text-3xl">
        {!auth ? (
          !showModal && (
            <>
              <button onClick={() => openModal("signin")}>
                <i className="fa-solid fa-right-to-bracket text-3xl">
                  {" "}
                  <span> SIGNIN</span>
                </i>
              </button>
              <button onClick={() => openModal("signup")}>
                <i className="fas fa-user-plus text-3xl">
                  <span> SIGNUP</span>
                </i>
              </button>
              <button
                type="button"
                className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
                onClick={() => setMenuOpen(true)}
              >
                <span className="sr-only">Open Menu</span>
                <Bars3Icon
                  className="h-8 w-8 text-primary-red"
                  aria-hidden="true"
                />
              </button>
            </>
          )
        ) : (
          <ul className="link flex flex-row gap-12">
            {onProfilePage && (
              <>
                <li>
                  <Link to="/publicart">
                    <i className="fa-solid fa-image text-3xl"> Art</i>
                  </Link>
                </li>
                <li>
                  <Link to="/calendar">
                    <i className="fa-solid fa-calendar text-3xl"> Calendar</i>
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    <i className="fa-solid fa-map text-3xl"> Explore</i>
                  </Link>
                </li>
              </>
            )}
            {onHomePage && (
              <>
                <li>
                  <Link to="/publicart">
                    <i className="fa-solid fa-image text-3xl"> Art</i>
                  </Link>
                </li>
                <li>
                  <Link to="/calendar">
                    <i className="fa-solid fa-calendar text-3xl"> Calendar</i>
                  </Link>
                </li>
                <li>
                  <Link to="/profile">
                    <i className="fa-regular fa-user"> Profile</i>
                  </Link>
                </li>
              </>
            )}
            {onCalendarPage && (
              <>
                <li>
                  <Link to="/publicart">
                    <i className="fa-solid fa-image text-3xl"> Art</i>
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    <i className="fa-solid fa-map text-3xl"> explore</i>
                  </Link>
                </li>
                <li>
                  <Link to="/profile">
                    <i className="fa-solid fa-user text-3xl"> Profile</i>
                  </Link>
                </li>
              </>
            )}
            {onArtPage && (
              <>
                <li>
                  <Link to="/calendar">
                    <i className="fa-solid fa-calendar text-3xl"> Calendar</i>
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    <i className="fa-solid fa-map text-3xl"> Explore</i>
                  </Link>
                </li>
                <li>
                  <Link to="/profile">
                    <i className="fa-solid fa-user text-3xl"> Profile</i>
                  </Link>
                </li>
              </>
            )}
            <li>
              <button onClick={handleLogout}>
                <i className="fa-solid fa-arrow-right-from-bracket"> Logout</i>
              </button>
            </li>
          </ul>
        )}
      </div>
      {showModal && (
        <UserAuth
          showModal={showModal}
          setShowModal={setShowModal}
          modalType={modalType}
          setModalType={setModalType}
          onLogin={() => setShowModal(false)} // Close modal on login
        />
      )}
    </nav>
  )
}

export default NavBar
