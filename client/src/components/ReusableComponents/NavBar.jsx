import { useState } from "react"
import { Link } from "react-router-dom"
import UserSignIn from "../SignIn/SignIn"
import SignUp from "../SignUp/SignUp"
import Profile from "../../Pages/Profile/Profile"

function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <>
      <nav className="bg-white text-black gap-4 flex flex-row px-8 py-6">
        <div className="font-bold">
          <Link to="/">Logo</Link>
        </div>
        <div className="container mx-auto flex justify-around">
          <>
            <UserSignIn />
            <SignUp />
            <ul className="link flex flex-row gap-6">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
            </ul>
            <div className="flex space-x-4">
              {isLoggedIn ? (
                <>
                  <UserSignIn onLogin={() => setIsLoggedIn(true)} />
                  <Profile />
                  <SignUp hidden={true} />
                </>
              ) : (
                <>
                  <h3>Profile Pic</h3>
                </>
              )}
            </div>
          </>
        </div>
      </nav>
    </>
  )
}

// function NavBar() {
//     return (
//       <nav className="bg-white text-black p-4">
//         <div className="container mx-auto flex justify-between items-center">
//           <div className="font-bold">Logo</div>
//           <div className="flex space-x-4">
//             <SignIn />
//             <SignUp />
//           </div>
//         </div>
//       </nav>
//     );
//   }

export default NavBar
