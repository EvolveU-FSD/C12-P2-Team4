import { useState } from "react";
import UserSignIn from "../SignIn/SignIn";
import SignUp from "../SignUp/SignUp";
import Profile from "../Profile/Profile";

function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <nav className="bg-white text-black p-4">
      <div className="container mx-auto flex justify-between">
        {/* <div className="font-bold">Logo</div> */}
        <div className="flex space-x-4">
          {isLoggedIn ? (
            <Profile />
          ) : (
            <>
              <UserSignIn onLogin={() => setIsLoggedIn(true)} />
              <SignUp />
            </>
          )}
        </div>
      </div>
    </nav>
  );
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

export default NavBar;
