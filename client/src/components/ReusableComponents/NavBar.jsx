import { useState } from "react"
import { Link, useLocation } from "react-router-dom"

import UserAuth from "../SignIn/SignIn"

function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const location = useLocation() // This hook gives us the current URL location
  const onProfilePage = location.pathname === "/profile"
  const onHomePage = location.pathname === "/"

  return (
    <nav className="bg-white text-black gap-4 flex flex-row px-8 py-6">
      <div className="font-bold">
        <Link to="/">
          <i className="fa-solid fa-house text-3xl"></i>
        </Link>
      </div>
      <div className="container mx-auto flex justify-around text-3xl">
        {!isLoggedIn ? (
          <>
            <UserAuth onLogin={() => setIsLoggedIn(true)} />
          </>
        ) : (
          <ul className="link flex flex-row gap-12">
            {onProfilePage && (
              <li>
                <Link to="/">Home</Link>
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
              <button onClick={() => setIsLoggedIn(false)}>
                <i className="fa-solid fa-arrow-right-from-bracket"> Logout</i>
              </button>
            </li>
          </ul>
        )}
      </div>
    </nav>
  )
}

export default NavBar
