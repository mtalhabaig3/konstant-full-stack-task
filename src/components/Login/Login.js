// Login.js
import axios from "axios";
import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3001/login", {
        username: email,
        password,
      });
      console.log(response.data);
      const { userId } = response.data;
      console.log(userId);
      setError("");
      onLogin(userId);
      // Login successful, you may set the loggedInUserId state to the logged-in user's ID
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  // const handleRegister = () => {
  //   console.log("navigating to register");
  //   navigate("/login");
  // };

  return (
    <div className="container">
      {" "}
      <h2 className="login-h2">Login</h2>
      <input
        className="login-input"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        className="login-input"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button className="login-button" onClick={handleLogin}>
        Login
      </button>
      {/* <button className="login-button" onClick={handleRegister}>
        Register
      </button> */}
      {error && <p className="login-button">{error}</p>}
    </div>
  );
};

export default Login;
