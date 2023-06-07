import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AuthContextWrapper from "./Context/authContext.jsx";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { io } from "socket.io-client";

// const socket = io();

// socket.on("databaseChange", () => {
//   console.log("socket on is working");
//   // Display toast notification using react-toastify
//   toast("A change occurred in the database!");
// });

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextWrapper>
        <App />
      </AuthContextWrapper>
      {/* <ToastContainer position="top-right" autoClose={3000} hideProgressBar /> */}
    </BrowserRouter>
  </React.StrictMode>
);
