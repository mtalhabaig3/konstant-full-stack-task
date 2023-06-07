import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import axios from "axios";
import Register from "./Register";

jest.mock("axios");

describe("Register Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders register form correctly", () => {
    render(<Register />);

    expect(screen.getByText("Register")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Confirm Password")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Register" })
    ).toBeInTheDocument();
  });

  test("handles registration successfully", async () => {
    const userId = "12345";
    axios.post.mockResolvedValueOnce({ data: { userId } });
    const onRegister = jest.fn();

    render(<Register onRegister={onRegister} />);

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

    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith("http://localhost:3001/register", {
      username: "test@example.com",
      password: "password",
    });

    await screen.findByText("Registration successful");
    expect(onRegister).toHaveBeenCalledWith(userId);
  });

  test("handles registration error", async () => {
    const errorMessage = "Registration failed";
    axios.post.mockRejectedValueOnce(new Error(errorMessage));

    render(<Register />);

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

    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith("http://localhost:3001/register", {
      username: "test@example.com",
      password: "password",
    });

    await screen.findByText("Error registering user");
  });
});
