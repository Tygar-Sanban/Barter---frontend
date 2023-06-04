import React, { useEffect, useState } from "react";
import service from "../service/service.js";
import { Link, useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";

function SearchResults() {
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [availableBrowsedUsers, setAvailableBrowsedUsers] = useState([]);
  const params = useParams();

  async function getAllUsers() {
    const response = await service.get("/user");
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
      <div style={{ paddingTop: "8vh" }}>
        {availableBrowsedUsers.length > 0 &&
          availableBrowsedUsers.map((elem) => {
            const url = `/provider-profile/${elem._id}`;
            return (
              <Link key={elem._id} to={url}>
                <div>{elem.name}</div>
              </Link>
            );
          })}
      </div>
    </div>
  );
}

export default SearchResults;
