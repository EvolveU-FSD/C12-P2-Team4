// App.jsx
import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./Pages/Home/Home";
import Profile from "./Pages/Profile/Profile";
import Calendar from "./Pages/Calendar/CalendarTwo";
import PublicArt from "./Pages/Art/PublicArt";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/publicart" element={<PublicArt />} />
    </Routes>
  );
};

export default App;
