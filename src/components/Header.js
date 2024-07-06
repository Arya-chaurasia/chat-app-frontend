// src/components/Header.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/Reducer/authSlice";
import { useNavigate } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiMessageSquare } from "react-icons/fi";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="bg-gray-800 text-white py-4 px-6 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        {user?.profileImage ? (
          <img
            src={user.profileImage}
            alt={`${user.name}'s profile`}
            className="w-10 h-10 rounded-full border border-white"
          />
        ) : (
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <span className="text-sm font-semibold text-gray-800">
              {user?.name?.charAt(0)}
            </span>
          </div>
        )}
        <h1 className="text-2xl font-bold">ChatApp</h1>
      </div>

      <div className="flex items-center space-x-6">
        <button className="text-white">
          <FiMessageSquare size={24} />
        </button>
        <button onClick={toggleMenu} className="relative">
          <BsThreeDotsVertical size={24} />
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
              <button
                onClick={handleLogout}
                className="block w-full px-4 py-2 text-gray-800 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
