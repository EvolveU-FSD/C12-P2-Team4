// App.jsx
import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./Pages/Home/Home";
import Profile from "./Pages/Profile/Profile";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
};

export default App;
