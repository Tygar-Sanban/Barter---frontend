import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";

function SearchResults() {
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [availableBrowsedUsers, setAvailableBrowsedUsers] = useState([]);
  const params = useParams();

  async function getAllUsers() {
    const response = await axios.get("http://localhost:5005/user");
    setAllUsers(response.data);
  }

  useEffect(() => {
    getAllUsers();
  }, []);

  useEffect(() => {
    if (allUsers.length > 0) {
      const usersBrowsing = allUsers.filter((elem) => {
        return elem.skills.includes(params.query);
      });
      setSelectedUsers(usersBrowsing);
    }
    if (selectedUsers.length > 0) {
      const availableUsers = selectedUsers.filter((elem) => {
        return elem.availability === true;
      });
      setAvailableBrowsedUsers(availableUsers);
    }
  }, [allUsers, params]);

  if (availableBrowsedUsers.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      {selectedUsers.length > 0 &&
        selectedUsers.map((elem) => {
          return <div key={elem._id}>{elem.name}</div>;
        })}
    </div>
  );
}

export default SearchResults;
