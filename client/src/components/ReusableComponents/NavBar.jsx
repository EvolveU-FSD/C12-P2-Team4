import React, { useContext, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import UserAuth from "../SignIn/SignIn"
import { AuthContext } from "../Auth/AuthProvider"
import "../SignIn/signin.css"

function NavBar() {
  const { auth, logout } = useContext(AuthContext)
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState(null)
  const location = useLocation() // This hook gives us the current URL location
  const onProfilePage = location.pathname === "/profile"
  const onHomePage = location.pathname === "/"
  const openModal = (type) => {
    setModalType(type)
    setShowModal(true)
  }

  return (
    <nav className="bg-black text-green-300 gap-4 flex flex-row px-8 py-6">
      <div className="font-bold">
        <Link to="/">
          <i className="fa-solid fa-house text-3xl"></i>
        </Link>
      </div>
      <div className="container mx-auto flex justify-around text-3xl">
        {!auth ? (
          <>
            <button onClick={() => openModal("signin")}>
              <i className="fa-solid fa-right-to-bracket text-3xl"> Sign In</i>
            </button>
            <button onClick={() => openModal("signup")}>
              <i className="fas fa-user-plus text-3xl"> Sign Up</i>
            </button>
          </>
        ) : (
          <ul className="link flex flex-row gap-12">
            {onProfilePage && (
              <li>
                <Link to="/">
                  <i className="fa-solid fa-house text-3xl"> HOME</i>
                </Link>
              </li>
            )}
            {onHomePage && (
              <li>
                <Link to="/profile">
                  <i className="fa-regular fa-user"> Profile</i>
                </Link>
              </li>
            )}
            <li>
              <button onClick={logout}>
                <i className="fa-solid fa-arrow-right-from-bracket"> Logout</i>
              </button>
            </li>
          </ul>
        )}
      </div>
      <UserAuth
        showModal={showModal}
        setShowModal={setShowModal}
        modalType={modalType}
        setModalType={setModalType}
        onLogin={() => setShowModal(false)} // Close modal on login
      />
    </nav>
  )
}

export default NavBar
