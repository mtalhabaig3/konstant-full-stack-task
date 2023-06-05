const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

let messageId = 1;

let messages = [];
let users = [];

console.log(users);

// Get all messages
app.get("/messages", (req, res) => {
  res.json(messages);
});

// Create a new message
app.post("/messages", (req, res) => {
  const { username, message, userId } = req.body;
  const timestamp = new Date().toISOString();
  const newMessage = { id: messageId++, username, message, timestamp, userId };
  messages.push(newMessage);
  res.status(201).json(newMessage);
});

// Update a message
app.put("/messages/:id", (req, res) => {
  const { id } = req.params;
  const { username, message, userId } = req.body;
  const timestamp = new Date().toISOString();

  const index = messages.findIndex((message) => message.id === parseInt(id));

  if (index !== -1 && messages[index].userId === userId) {
    messages[index] = {
      ...messages[index],
      username,
      message,
      timestamp,
    };
    res.json(messages[index]);
  } else {
    res
      .status(404)
      .json({ error: "Message not found or not authorized to update" });
  }
});

// Delete a message
app.delete("/messages/:id", (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  const index = messages.findIndex((message) => message.id === parseInt(id));

  if (index !== -1 && messages[index].userId === userId) {
    const deletedMessage = messages.splice(index, 1);
    res.json(deletedMessage[0]);
  } else {
    res
      .status(404)
      .json({ error: "Message not found or not authorized to delete" });
  }
});

// User registration
app.post("/register", (req, res) => {
  const { username, password } = req.body;
  const userId = users.length + 1; // Generate a unique user ID

  console.log("register api backend register");

  if (users.find((user) => user.username === username)) {
    res.status(409).json({ error: "Username already exists" });
  } else {
    const newUser = { id: userId, username, password };
    users.push(newUser);
    res.status(201).json({ message: "User registered successfully", userId });
  }
});

// User login
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  console.log("login api backend register");

  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (user) {
    res.status(200).json({ message: "Login successful", userId: user.id });
  } else {
    res.status(401).json({ error: "Invalid username or password" });
  }
});

// Start the server
const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
