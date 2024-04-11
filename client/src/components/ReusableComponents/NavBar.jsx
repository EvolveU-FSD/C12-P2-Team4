import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

function NavBar() {
  return (
    <nav className="bg-white text-black p-4">
      <div className="container mx-auto flex justify-between">
        <div className="font-bold">Logo</div>
        <div></div>
      </div>
    </nav>
  );
}

export default NavBar;
