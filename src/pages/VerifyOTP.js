// src/pages/VerifyOtpPage.js
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function VerifyOtpPage() {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const phone = location.state?.phone;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Proceed to set password step (here we're just navigating to the next step)
    if (otp === '123456') { // Placeholder for OTP verification logic
      navigate('/set-password', { state: { phone } });
    } else {
      setError('Invalid OTP, please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Verify OTP</h2>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Enter OTP</label>
            <input
              type="text"
              name="otp"
              className="w-full px-4 py-2 border rounded-lg"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
          >
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
}

export default VerifyOtpPage;
