// Switch.js
import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../Context/authContext";

function Switch() {
  const [isAvailable, setIsAvailable] = useState(false);
  const { user } = useContext(AuthContext);

  async function handleSwitch() {
    try {
      const updatedAvailability = !isAvailable;

      await axios.patch(`http://localhost:5005/user/${user._id}`, {
        availability: updatedAvailability,
      });
      setIsAvailable(updatedAvailability);
    } catch (error) {
      console.log(error);
    }
  }

  //   useEffect(() => {
  //     console.log("this is the availability", user.availability);
  //   }, [user.availability]);

  return (
    <div>
      <label>
        <input type="checkbox" checked={isAvailable} onChange={handleSwitch} />
        Availability: {isAvailable ? "Available" : "Not Available"}
      </label>
    </div>
  );
}

export default Switch;
