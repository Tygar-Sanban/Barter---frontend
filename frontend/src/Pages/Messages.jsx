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
  const [requesterName, setRequesterName] = useState("");

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
      console.log("response two", providerName);
      const responseThree = await service.get(`/user/${requester}`);
      // console.log(providerName.data.oneUser.name);
      setRequesterName(responseThree.data.oneUser.name);
      console.log("response three", requesterName);
    } catch (error) {
      console.log(error);
    }
  }

  async function postMessage() {
    try {
      const response = await service.post("/message", {
        content: newMessage,
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
    fetchUsers();
  }, []);

  useEffect(() => {
    fetchUserRequests();
    fetchMessages();
  }, []);

  return (
    request && (
      <>
        <Navbar />
        <div className="request-discussion bodyFont">
          <div style={{ paddingTop: "5vh" }}>
            {" "}
            <b> {request.name}</b>
          </div>
          <div>Request detail : {request.firstMessage}</div>
          <div>BarterBucks amount : {request.bbAmount}</div>
        </div>
        <div className="divider-container">
          <div className="divider"></div>
        </div>
        <div style={{ padding: "1rem" }}>
          {messages.map((message, index) => (
            <div key={index}>
              {message.sender === user._id ? (
                <p>
                  {message.sender.name}: {message.content}
                </p>
              ) : (
                <>
                  <p className="chat-name bodyFont">{message.sender.name} : </p>
                  <p className="chat-bubble bodyFont">{message.content}</p>
                </>
              )}
            </div>
          ))}
          <div className="textarea-container">
            <div>
              <textarea
                placeholder="Type your message"
                type="text"
                value={newMessage}
                onChange={(event) => setNewMessage(event.target.value)}
              />
            </div>
            <img
              style={{ width: "15%", padding: ".5rem" }}
              src="/Icons/send.png"
              onClick={postMessage}
            />
          </div>
        </div>
      </>
    )
  );
}

export default Messages;
