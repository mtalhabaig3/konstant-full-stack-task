import React from "react";
import { render, screen } from "@testing-library/react";
import PostList from "./PostList";

describe("PostList Component", () => {
  const posts = [
    {
      id: 1,
      username: "John",
      message: "Hello, world!",
      timestamp: "2023-06-04 12:34:56",
      userId: "12345",
    },
    {
      id: 2,
      username: "Jane",
      message: "Testing post list",
      timestamp: "2023-06-04 12:35:00",
      userId: "54321",
    },
  ];
  const loggedInUserId = "12345";
  const onDelete = jest.fn();
  const onUpdate = jest.fn();

  test("renders post list correctly with posts", () => {
    render(
      <PostList
        posts={posts}
        loggedInUserId={loggedInUserId}
        onDelete={onDelete}
        onUpdate={onUpdate}
      />
    );

    expect(screen.getByText("Messages:")).toBeInTheDocument();
    expect(screen.getByText("Hello, world!")).toBeInTheDocument();
    expect(screen.getByText("Testing post list")).toBeInTheDocument();
  });

  test("renders post list correctly without posts", () => {
    render(
      <PostList
        posts={[]}
        loggedInUserId={loggedInUserId}
        onDelete={onDelete}
        onUpdate={onUpdate}
      />
    );

    expect(screen.getByText("Messages:")).toBeInTheDocument();
    expect(screen.getByText("Add a Message!")).toBeInTheDocument();
  });
});
