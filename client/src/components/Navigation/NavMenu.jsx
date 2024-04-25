import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Import useNavigate
import UserAuth from "../SignIn/SignIn";
import { AuthContext } from "../Auth/AuthProvider";
import {
  Bars3Icon,
  CalendarIcon,
  PhotoIcon,
  GlobeAmericasIcon,
  MapIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { ToastContainer, toast } from "react-toastify";
import "../SignIn/signin.css";
import { css } from "glamor";

function NavMenu() {
  const { auth, _id, logout } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const onArtPage = location.pathname === "/publicart";
  const onCalendarPage = location.pathname === "/calendar";
  const onHomePage = location.pathname === "/";
  const onProfilePage = location.pathname === "/profile";

  const openModal = (type) => {
    setModalType(type);
    setShowModal(true);
  };

  const handleLogout = () => {
    logout(); // Call the logout function from AuthContext
    navigate("/");
    setMenuOpen(false); // Close the menu upon logging out
  };

  return (
    <nav className=" top-0 z-40 flex flex-row justify-between px-8 py-2 w-full h-[8rem]">
      <div>
        <Link to="/">
          <img
            src="public/assets/images/Eh-Travler-Logo-removebg.png"
            alt="logo"
            className="w-[10rem] h-[10rem] logo"
          />
        </Link>
      </div>

      <div className="ml-auto w-auto flex flex-row justify-end  text-primary-orange h-10">
        <button className="p-2" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? (
            <XMarkIcon className="h-8 w-8" />
          ) : (
            <Bars3Icon className="h-8   w-8" />
          )}
        </button>
        {menuOpen && (
          <div className="mx-auto flex gap-12 justify-around text-3xl">
            {!auth ? (
              !showModal && (
                <>
                  <button onClick={() => openModal("signin")}>
                    <i className="fa-solid fa-right-to-bracket text-3xl">
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
                        <i className="fa-solid fa-calendar text-3xl">
                          {" "}
                          Calendar
                        </i>
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
                        <i className="fa-solid fa-calendar text-3xl">
                          {" "}
                          Calendar
                        </i>
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
                        <i className="fa-solid fa-calendar text-3xl">
                          {" "}
                          Calendar
                        </i>
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
                    <i className="fa-solid fa-arrow-right-from-bracket">
                      {" "}
                      Logout
                    </i>
                  </button>
                </li>
              </ul>
            )}
          </div>
        )}

        {showModal && (
          <UserAuth
            showModal={showModal}
            setShowModal={setShowModal}
            modalType={modalType}
            setModalType={setModalType}
            onLogin={() => setShowModal(false)} // Close modal on login
          />
        )}
      </div>
    </nav>
  );
}

export default NavMenu;
