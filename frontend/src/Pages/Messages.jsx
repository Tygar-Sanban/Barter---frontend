import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/authContext";
import Navbar from "../Components/Navbar";
import service from "../service/service.js";
import { Link, useParams, useNavigate } from "react-router-dom";

function Messages() {
  const params = useParams();
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const [requester, setRequester] = useState(null);
  const [request, setRequest] = useState(null);
  const [provider, setProvider] = useState(null);
  const [providerName, setProviderName] = useState("");

  async function fetchMessages() {
    try {
      console.log("this is the params.query", params.query);
      //   const response = await service.get(`/message?requestId=${params.query}`);
      const response = await service.get(`/message/${params.query}`);
      console.log("response", response);
      setMessages(response.data);
      console.log("messages", messages);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchUserRequests() {
    try {
      const response = await service.get(`/request/${params.query}`);
      console.log("response data from the fetch sent requests", response.data);
      setRequest(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchUsers() {
    try {
      const response = await service.get(`/request/${params.query}`);
      console.log("response data fetch Requester", response.data);
      setRequester(response.data.requester);
      setProvider(response.data.provider);
      console.log("this is the requester", requester);
      console.log("this is the provider", provider);

      const responseTwo = await service.get(`/user/${provider}`);
      // console.log(providerName.data.oneUser.name);
      setProviderName(responseTwo.data.oneUser.name);
      console.log("response two", responseTwo);
    } catch (error) {
      console.log(error);
    }
  }

  async function postMessage() {
    try {
      const response = await service.post("/message", {
        content: newMessage,
        receiver: requester,
        requestId: params.query,
      });
      console.log("second params.query", params.query);
      console.log("postMessage response", response);
      //   Update the messages state with the newly created message
      // setMessages([...messages, response.data]);
      fetchMessages();
      // Clear the newMessage state
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  }


  async function getAllMessages() {
    try {
      const response = await service.get("/message");

      setAllMessages(response.data);

      console.log("all messages", allMessages);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchUsers();
  }, [requester]);


  useEffect(() => {
    fetchUserRequests();
    fetchMessages();
  }, []);

  return (
    request && (
      <>
      <Navbar />
        <div style={{ paddingTop: "8vh" }}>Title: {request.name}</div>
        <div>Detail : {request.firstMessage}</div>
        <div>BarterBucks amount : {request.bbAmount}</div>
        <div>
          {messages.map((message, index) => (
            <div key={index}>
              {message.sender === user._id ? (
                <p>
                  {user.name}: {message.content}
                </p>
              ) : (
                <p>
                  {providerName}: {message.content}
                </p>
              )}
            </div>
          ))}

          <input
            type="text"
            value={newMessage}
            onChange={(event) => setNewMessage(event.target.value)}
          />
          <button onClick={postMessage}>Send</button>
        </div>
      </>
    )
  );
}

export default Messages;
