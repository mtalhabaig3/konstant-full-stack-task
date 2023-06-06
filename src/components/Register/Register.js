// Register.js
import React, { useState } from "react";
import axios from "axios";
import "./Register.css";

const Register = ({ onRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    try {
      const response = await axios.post("http://localhost:3001/register", {
        username: email,
        password: password,
      });
      console.log("register api front end");
      const { userId } = response.data;
      console.log(userId);
      setError("");
      onRegister(userId);
      // Registration successful, you may redirect the user to the register page
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <div className="container">
      {" "}
      <h2 className="register-h2">Register</h2>
      <input
        className="register-input"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        className="register-input"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <input
        className="register-input"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm Password"
      />
      <button className="register-button" onClick={handleRegister}>
        Register
      </button>
      {error && <p className="register-button">{error}</p>}
    </div>
  );
};

export default Register;
