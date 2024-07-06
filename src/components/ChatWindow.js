import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { withoutAuthAxios } from "../config/config";
import { useSocket } from "../config/SocketContext";
import IsLoadingHOC from "../config/isLoadingHOC";

const ChatWindow = (props) => {
  const { setLoading } = props;

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const activeChat = useSelector((state) => state.chat.activeChat);
  const currentUser = useSelector((state) => state.auth.user);
  const socket = useSocket();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const fetchMessages = async () => {
      if (activeChat && activeChat._id) {
        try {
          const response = await withoutAuthAxios().get(
            `/chat/messages/${activeChat._id}`
          );
          setMessages(response.data.data);
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      }
    };

    fetchMessages();
  }, [activeChat]);

  useEffect(() => {
    // Scroll to the bottom whenever messages change
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() && activeChat?._id) {
      const messageData = {
        text: newMessage,
        sender: currentUser._id,
        receiver: activeChat.users.find((p) => p._id !== currentUser._id)._id,
        chatId: activeChat._id,
      };
      console.log(messageData,"messageData")

      // Emit the message to the server via socket
      if (socket) {
        console.log("emititng")
        socket.emit("sendMessage", messageData);
      }

      // Optimistically update the UI
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          ...messageData,
          _id: Date.now(),
          createdAt: new Date().toISOString(),
        },
      ]);

      // Clear the message input
      setNewMessage("");
    }
  };

  useEffect(() => {
    
    if (socket) {
      socket.on("receiveMessage", (incomingMessage) => {
        // Update messages state with the received message
        setMessages((prevMessages) => [...prevMessages, incomingMessage]);
      });

      // Clean up socket listener
      return () => {
        socket.off("receiveMessage");
      };
    }
  }, [socket]);

  if (!activeChat) {
    return (
      <div className="flex items-center justify-center h-full">
        <h2>Welcome to ChatApp! Select a chat to start messaging.</h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="p-4 bg-gray-200 border-b border-gray-300">
        <h2 className="text-xl font-bold">
          {
            activeChat?.users?.filter(p => p._id !== currentUser._id)[0]?.name
          }
        </h2>
      </div>

      {/* Chat Messages */}
      <div className="flex-grow p-4 overflow-y-auto space-y-4">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`flex flex-col ${
              msg.sender === currentUser._id ? "items-end" : "items-start"
            }`}
          >
            <div
              className={`p-2 rounded-lg ${
                msg.sender === currentUser._id
                  ? "bg-blue-200 text-black self-end"
                  : "bg-gray-100 self-start"
              }`}
            >
              <p>{msg.text}</p>
              <span className="text-xs text-gray-500 mt-1">
                {new Date(msg.createdAt).toLocaleString()}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} /> {/* Dummy element for auto-scroll */}
      </div>

      {/* Message Input */}
      <div className="p-4 bg-white border-t border-gray-200 flex items-center">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded mr-2"
          placeholder="Type a message..."
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default IsLoadingHOC(ChatWindow);
