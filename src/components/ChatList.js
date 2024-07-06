// src/components/ChatList.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveChat } from '../Redux/Reducer/chatSlice';
import Header from './Header';

const ChatList = ({ chats, activeChatId, onClickChat }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user); 

  const getOtherParticipantsNames = (chat) => {
    if (!chat?.users || !Array.isArray(chat.users)) {
      return '';
    }
    return chat.users
      .filter(user => user._id !== currentUser._id)
      .map(user => user.name)
      .join(', ');
  };

  const handleChatClick = (chat) => {
    onClickChat(chat);
  };

  return (
    <div className="bg-gray-200 h-screen overflow-y-auto flex flex-col">
        <Header />
      {chats?.map((chat) => (
        <div
          key={chat._id}
          onClick={() => handleChatClick(chat)}
          className={`flex items-center p-3 cursor-pointer hover:bg-gray-300 ${
            chat._id === activeChatId ? 'bg-gray-300' : ''
          }`}
        >
          <div className="flex-shrink-0 rounded-full h-12 w-12 bg-blue-500 text-white flex items-center justify-center">
            {getOtherParticipantsNames(chat)
              .split(' ')
              .map((name) => name[0])
              .join('')}
          </div>
          <div className="ml-3">
            <div className="text-sm font-medium text-gray-800">
              {getOtherParticipantsNames(chat)}
            </div>
            <div className="text-xs text-gray-500">
              {chat.latestMessage?.text}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
