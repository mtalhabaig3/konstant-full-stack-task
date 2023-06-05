// NewPost.js
import React, { useState } from "react";

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
    <div>
      <h2>New Post</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Message"
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default NewPost;
