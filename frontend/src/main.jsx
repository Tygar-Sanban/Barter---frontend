import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AuthContextWrapper from "./Context/authContext.jsx";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
// import { io } from "socket.io-client";

// const socket = io("http://localhost:5005");

// socket.on("notification", (data) => {
//   console.log("Received notification:", data);
//   // Display a push notification
//   if (Notification.permission === "granted") {
//     new Notification("You've been requested", {
//       body: data.message,
//     });
//   }
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
