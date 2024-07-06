// src/pages/ChatDashboard.js
import React, { useEffect, useState } from "react";
import ChatList from "../components/ChatList";
import ChatWindow from "../components/ChatWindow";
import { useDispatch, useSelector } from "react-redux";
import { authAxios } from "../config/config";
import { setChats, setActiveChat } from "../Redux/Reducer/chatSlice";

const ChatDashboard = () => {
  const dispatch = useDispatch();
  const chats = useSelector((state) => state.chat.chats);
  const activeChat = useSelector((state) => state.chat.activeChat);
  console.log(chats, "chats");
  const [activeChatId, setActiveChatId] = useState(null);
  const fetchChats = async () => {
    try {
      const response = await authAxios().get("/chat/all-chats");
      console.log(response.data, "response data");
      if (response.data.status === 1) {
        // Assuming status 1 indicates success
        console.log(response.data.data, "response.data.data");
        dispatch(setChats(response.data.data));
      } else {
        console.error("Error fetching chats:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  };

  useEffect(() => {
    fetchChats();
  }, [dispatch]);

  const handleChatClick = (chat) => {
    console.log(chat._id, "chat from dashboard");
    dispatch(setActiveChat(chat));
    setActiveChatId(chat?._id);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow flex overflow-hidden">
        {/* Sidebar - Chat List */}
        <div className="w-1/4 bg-gray-100 border-r border-gray-300 overflow-y-auto">
          <ChatList
            chats={chats}
            activeChatId={activeChatId}
            onClickChat={handleChatClick}
          />
        </div>

        {/* Main Area - Chat Window */}
        <div className="w-3/4 bg-white flex flex-col overflow-hidden">
          {activeChat ? (
            <ChatWindow activeChat={activeChat} />
          ) : (
            <div className="flex items-center justify-center h-full">
              <h2 className="text-xl text-gray-500">
                Welcome to ChatApp! Select a chat to start messaging.
              </h2>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ChatDashboard;

