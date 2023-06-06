// NewPost.js
import React, { useState } from "react";
import "./NewPost.css";

const NewPost = ({ onSubmit }) => {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    // Perform submit logic here
    onSubmit(username, message);
    setUsername("");
    setMessage("");
  };

  return (
    <div className="new-post-container">
      <h2 className="new-post-title">New Post</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Name"
        className="new-post-input"
      />
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Message"
        className="new-post-input"
      />
      <button onClick={handleSubmit} className="new-post-button">
        Create
      </button>
    </div>
  );
};

export default NewPost;
