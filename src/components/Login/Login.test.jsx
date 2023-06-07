import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import axios from "axios";
import Login from "./Login";

jest.mock("axios");

describe("Login Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders login form correctly", () => {
    render(<Login />);

    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
  });

  test("handles login successfully", async () => {
    const userId = "12345";
    axios.post.mockResolvedValueOnce({ data: { userId } });
    const onLogin = jest.fn();

    render(<Login onLogin={onLogin} />);

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith("http://localhost:3001/login", {
      username: "test@example.com",
      password: "password",
    });

    await screen.findByText("Login successful");
    expect(onLogin).toHaveBeenCalledWith(userId);
  });

  test("handles login error", async () => {
    const errorMessage = "Invalid credentials";
    axios.post.mockRejectedValueOnce(new Error(errorMessage));

    render(<Login />);

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith("http://localhost:3001/login", {
      username: "test@example.com",
      password: "password",
    });

    await screen.findByText("Error logging in");
  });
});
