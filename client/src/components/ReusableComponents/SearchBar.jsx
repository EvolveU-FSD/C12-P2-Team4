import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
function SearchBar() {
  return (
    <div className="flex justify-center space-x-4">
      <button className="flex items-center px-4 py-2 text-white bg-black rounded">
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
//     <div className="flex justify-center space-x-4">
//       <button className="px-4 py-2 text-white bg-blue-500 rounded">
//         <SearchIcon className="w-5 h-5 mr-2" />
//         Search
//       </button>
//       <input
//         className="w-48 p-2 border rounded border-gray-300"
//         type="text"
//         placeholder=" restaurants, hotel, bar etc."
//       />
//     </div>
//   );
export default SearchBar;
