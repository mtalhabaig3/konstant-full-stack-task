import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import NewPost from "./NewPost";

describe("NewPost Component", () => {
  test("renders new post form correctly", () => {
    render(<NewPost onSubmit={() => {}} />);

    expect(screen.getByText("New Post")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Message")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Create" })).toBeInTheDocument();
  });

  test("handles form submission correctly", () => {
    const onSubmitMock = jest.fn();

    render(<NewPost onSubmit={onSubmitMock} />);

    fireEvent.change(screen.getByPlaceholderText("Name"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByPlaceholderText("Message"), {
      target: { value: "Hello, world!" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Create" }));

    expect(onSubmitMock).toHaveBeenCalledTimes(1);
    expect(onSubmitMock).toHaveBeenCalledWith("John", "Hello, world!");

    // Verify that the input fields are cleared after submission
    expect(screen.getByPlaceholderText("Name").value).toBe("");
    expect(screen.getByPlaceholderText("Message").value).toBe("");
  });
});
