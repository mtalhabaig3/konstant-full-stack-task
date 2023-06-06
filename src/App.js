import React, { useEffect, useState } from "react";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import PostList from "./components/PostList/PostList";
import NewPost from "./components/NewPost/NewPost";
import { useNavigate } from "react-router-dom";
import { Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import "./App.css";

const Welcome = () => {
  return (
    <div className="container">
      {" "}
      <h2>Welcome</h2>
      <p>Please login or register:</p>
      <div>
        <Link className="link" to="/login">
          Login
        </Link>{" "}
        <Link className="link" to="/register">
          Register
        </Link>{" "}
      </div>
    </div>
  );
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUserId, setLoggedInUserId] = useState(null);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const fetchMessages = async () => {
    try {
      const response = await axios.get("http://localhost:3001/messages");
      const fetchedPosts = response.data;
      setPosts(fetchedPosts);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleLogin = (userId) => {
    setIsLoggedIn(true);
    setLoggedInUserId(userId);
    navigate("/");
  };

  const handleLogOut = () => {
    setIsLoggedIn(false);
    setLoggedInUserId(null);
  };

  const handleRegister = (userId) => {
    setIsLoggedIn(true);
    setLoggedInUserId(userId);
    navigate("/");
  };

  const handlePostSubmit = async (username, message) => {
    try {
      const response = await axios.post("http://localhost:3001/messages", {
        username: username,
        message: message,
        userId: loggedInUserId,
      });
      const createdPost = response.data;
      setPosts([...posts, createdPost]);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await axios.delete(`http://localhost:3001/messages/${postId}`, {
        data: { userId: loggedInUserId },
      });
      const updatedPosts = posts.filter((post) => post.id !== postId);
      setPosts(updatedPosts);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleUpdatePost = async (postId, updatedMessage) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/messages/${postId}`,
        { message: updatedMessage, userId: loggedInUserId }
      );
      const updatedPost = response.data;
      const updatedPosts = posts.map((post) =>
        post.id === updatedPost.id ? updatedPost : post
      );
      setPosts(updatedPosts);
      console.log("handleUpdatePost function");
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  // Filter posts based on user authentication status
  const filteredPosts = isLoggedIn ? posts : [];

  return (
    <Routes>
      <Route
        path="/"
        element={
          isLoggedIn ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "10px",
              }}
            >
              <NewPost onSubmit={handlePostSubmit} />
              <PostList
                posts={posts}
                loggedInUserId={loggedInUserId}
                onDelete={handleDeletePost}
                onUpdate={handleUpdatePost}
              />
              <button className="logout" onClick={handleLogOut}>
                Log Out
              </button>
            </div>
          ) : (
            <Welcome />
          )
        }
      />
      <Route path="/login" element={<Login onLogin={handleLogin} />} />
      <Route
        path="/register"
        element={<Register onRegister={handleRegister} />}
      />
    </Routes>
  );
};

export default App;
