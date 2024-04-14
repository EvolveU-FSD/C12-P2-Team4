import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
function SearchBar() {
  return (
    <div className="flex justify-center space-x-4">
      <button className="flex items-center px-4 py-2 text-white bg-black rounded  ml-2.5">
        <MagnifyingGlassIcon className="h-5 w-5" />
      </button>
      <input
        className="w-48 p-2 border rounded bg-[#F2EEED] border-gray-300"
        type="text"
        placeholder="Search..."
      />
    </div>
  );
}

export default SearchBar;
