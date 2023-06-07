import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import axios from "axios";
import { MemoryRouter, Routes } from "react-router-dom";
import App from "./App";

jest.mock("axios");

describe("App Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders welcome page when not logged in", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <App />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Welcome")).toBeInTheDocument();
    expect(screen.getByText("Please login or register:")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Login" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Register" })).toBeInTheDocument();
  });

  test("handles successful login", () => {
    const onLogin = jest.fn();
    render(
      <MemoryRouter initialEntries={["/login"]}>
        <Routes>
          <App />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    expect(onLogin).toHaveBeenCalledTimes(1);
    expect(onLogin).toHaveBeenCalledWith("12345");
  });

  test("handles successful registration", () => {
    const onRegister = jest.fn();
    render(
      <MemoryRouter initialEntries={["/register"]}>
        <Routes>
          <App />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password" },
    });
    fireEvent.change(screen.getByPlaceholderText("Confirm Password"), {
      target: { value: "password" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Register" }));

    expect(onRegister).toHaveBeenCalledTimes(1);
    expect(onRegister).toHaveBeenCalledWith("12345");
  });

  test("renders post list and new post form when logged in", () => {
    const loggedInUserId = "12345";
    const posts = [
      {
        id: 1,
        username: "user1",
        message: "Message 1",
        userId: loggedInUserId,
      },
      { id: 2, username: "user2", message: "Message 2", userId: "54321" },
    ];
    const onDelete = jest.fn();
    const onUpdate = jest.fn();
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <App
            loggedInUserId={loggedInUserId}
            posts={posts}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("New Post")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Message")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Create" })).toBeInTheDocument();

    expect(screen.getByText("Message 1")).toBeInTheDocument();
    expect(screen.getByText("Message 2")).toBeInTheDocument();

    expect(screen.getByText("Log Out")).toBeInTheDocument();
  });

  test("handles post deletion", async () => {
    const loggedInUserId = "12345";
    const posts = [
      {
        id: 1,
        username: "user1",
        message: "Message 1",
        userId: loggedInUserId,
      },
      { id: 2, username: "user2", message: "Message 2", userId: "54321" },
    ];
    axios.delete.mockResolvedValueOnce({});
    const onDelete = jest.fn();
    const onUpdate = jest.fn();
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <App
            loggedInUserId={loggedInUserId}
            posts={posts}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(screen.getAllByRole("button", { name: "Delete" })[0]);

    expect(axios.delete).toHaveBeenCalledTimes(1);
    expect(axios.delete).toHaveBeenCalledWith(
      "http://localhost:3001/messages/1",
      { data: { userId: "12345" } }
    );

    await waitFor(() => {
      expect(screen.queryByText("Message 1")).not.toBeInTheDocument();
      expect(onDelete).toHaveBeenCalledWith(1);
    });
  });

  test("handles post update", async () => {
    const loggedInUserId = "12345";
    const posts = [
      {
        id: 1,
        username: "user1",
        message: "Message 1",
        userId: loggedInUserId,
      },
      { id: 2, username: "user2", message: "Message 2", userId: "54321" },
    ];
    const updatedMessage = "Updated message";
    axios.put.mockResolvedValueOnce({
      data: {
        id: 1,
        username: "user1",
        message: updatedMessage,
        userId: loggedInUserId,
      },
    });
    const onDelete = jest.fn();
    const onUpdate = jest.fn();
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <App
            loggedInUserId={loggedInUserId}
            posts={posts}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(screen.getAllByRole("button", { name: "Edit" })[0]);
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: updatedMessage },
    });
    fireEvent.click(screen.getByRole("button", { name: "Update" }));

    expect(axios.put).toHaveBeenCalledTimes(1);
    expect(axios.put).toHaveBeenCalledWith("http://localhost:3001/messages/1", {
      message: updatedMessage,
      userId: "12345",
    });

    await waitFor(() => {
      expect(screen.getByText(updatedMessage)).toBeInTheDocument();
      expect(onUpdate).toHaveBeenCalledWith(1, updatedMessage);
    });
  });
});
