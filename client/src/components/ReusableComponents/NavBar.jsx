import { useState } from "react";
import SignIn from "../../SignIn/SignIn";
import SignUp from "SignUp";
import Profile from "Profile";
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
              <SignIn onLogin={() => setIsLoggedIn(true)} />
              <SignUp />
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
