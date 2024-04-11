import { useState } from "react";

function SearchBar() {
  return (
    <div className="search-bar">
      <button>Search</button>
      <input type="text" placeholder="Search..." />
    </div>
  );
}

export default SearchBar;
