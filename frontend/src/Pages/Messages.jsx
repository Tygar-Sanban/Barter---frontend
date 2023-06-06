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

  async function fetchRequester() {
    try {
      const response = await service.get(`/request/${params.query}`);
      setRequester(response.data.requester);
      console.log("this is the requester", requester);
    } catch (error) {
      console.log(error);
    }
  }

  //   async function fetRequest() {
  //     try {
  //         const response = await service.get()
  //     } catch (error) {
  //         console.log(error);
  //     }
  //   }

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

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    fetchRequester();
    console.log("is there an infinite loop ?");
  }, [requester]);

  return (
    <div>
      <Navbar />
      <div style={{ paddingTop: "8vh" }}>
        {messages.map((message, index) => (
          <div key={index}>
            {message.sender === user._id ? (
              <p>Sent: {message.content}</p>
            ) : (
              <p>Received: {message.content}</p>
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
    </div>
  );
}

export default Messages;
