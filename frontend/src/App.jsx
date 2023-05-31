import { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import SelectSkills from "./Components/SelectSkills";
import Homepage from "./Pages/Homepage";
import SignUp from "./Pages/SignUp";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
