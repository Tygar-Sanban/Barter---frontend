import { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import SelectSkills from "./Components/SelectSkills";
import Homepage from "./Pages/Homepage";
import SignUp from "./Pages/SignUp";
import LogIn from "./Pages/LogIn";
import ProfilePage from "./Pages/ProfilePage";
import Search from "./Pages/Search";
import Personal from "./Pages/SkillsCategories/Personal";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/search" element={<Search />} />
        <Route path="/personal" element={<Personal />} />
        <Route path="/professional" element={<Personal />} />
        <Route path="/health-and-wellness" element={<Personal />} />
        <Route path="/professional" element={<Personal />} />
        <Route path="/professional" element={<Personal />} />
        <Route path="/professional" element={<Personal />} />
        <Route path="/professional" element={<Personal />} />
      </Routes>
    </>
  );
}

export default App;
