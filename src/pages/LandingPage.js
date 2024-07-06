import React from 'react'
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login');
    };

    const handleRegisterClick = () => {
        navigate('/register');
    };
    return (
        <div className="min-h-screen flex flex-col">
          <main className="flex-grow flex items-center justify-center bg-gray-100">
            <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-lg">
              <h2 className="text-3xl font-bold mb-4">Welcome to ChatApp</h2>
              <p className="text-gray-700 mb-6">
                Connect with your friends and family instantly!
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg"
                  onClick={handleLoginClick}
                >
                  Login
                </button>
                <button
                  className="bg-green-500 text-white py-2 px-4 rounded-lg"
                  onClick={handleRegisterClick}
                >
                  Register
                </button>
              </div>
            </div>
          </main>
        </div>
      );
}

export default LandingPage;