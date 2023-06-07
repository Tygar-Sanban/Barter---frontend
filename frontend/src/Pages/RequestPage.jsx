import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";

function RequestPage() {
  return (
    <div>
      <Navbar />
      <div className="request-paths" style={{ paddingTop: "13vh" }}>
        <Link to="/my-requests">
          <button>Requests you received</button>
        </Link>
        <Link to="/sent-requests">
          <button>Requests you've sent</button>
        </Link>
      </div>
    </div>
  );
}

export default RequestPage;
