import { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import SelectSkills from "./Components/SelectSkills";
import Homepage from "./Pages/Homepage";
import SignUp from "./Pages/SignUp";
import LogIn from "./Pages/LogIn";
import ProfilePage from "./Pages/ProfilePage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </>
  );
}

export default App;
