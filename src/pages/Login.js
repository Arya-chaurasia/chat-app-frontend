import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IsLoadingHOC from "../config/isLoadingHOC";
import { saveUser, setAccessToken } from "../Redux/Reducer/authSlice";
import { toast } from "react-toastify";
import { withoutAuthAxios } from "../config/config";

const Login = (props) => {
  const { setLoading } = props;
  const initialFormData = {
    email: "",
    password: "",
  };

  const token = useSelector((state) => state.auth.accessToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password.length < 8) {
      toast.error("Invalid password");
      return;
    }
    try {
      setLoading(true);
      const response = await withoutAuthAxios().post("/user/login", formData);
      console.log(response, "res")
      const resData = response.data;
      setLoading(false);
      if (resData.status === 1) {
        dispatch(saveUser(resData.data));
        dispatch(setAccessToken(resData.data.token));
        toast.success("Logged in successfully");
        setFormData(initialFormData);
        navigate("/chats");
      } else {
        toast.error(resData.message || "An error occurred.");
      }
    } catch (error) {
      console.log(error, "error")
      setLoading(false);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              className="w-full px-4 py-2 border rounded-lg"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default IsLoadingHOC(Login);
