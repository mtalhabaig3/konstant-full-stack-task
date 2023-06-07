import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PostItem from "./PostItem";

describe("PostItem Component", () => {
  const post = {
    id: 1,
    username: "John",
    message: "Hello, world!",
    timestamp: "2023-06-04 12:34:56",
    userId: "12345",
  };
  const loggedInUserId = "12345";
  const onDelete = jest.fn();
  const onUpdate = jest.fn();

  test("renders post item correctly", () => {
    render(
      <PostItem
        post={post}
        loggedInUserId={loggedInUserId}
        onDelete={onDelete}
        onUpdate={onUpdate}
      />
    );

    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.getByText("Hello, world!")).toBeInTheDocument();
    expect(screen.getByText("2023-06-04 12:34:56")).toBeInTheDocument();

    // Edit and Delete buttons should only be visible to the post owner
    expect(screen.getByText("Edit")).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });

  test("handles delete correctly for the post owner", () => {
    render(
      <PostItem
        post={post}
        loggedInUserId={loggedInUserId}
        onDelete={onDelete}
        onUpdate={onUpdate}
      />
    );

    fireEvent.click(screen.getByText("Delete"));

    expect(onDelete).toHaveBeenCalledTimes(1);
    expect(onDelete).toHaveBeenCalledWith(1);
  });

  test("does not handle delete for non-owner", () => {
    const nonOwnerUserId = "54321";

    render(
      <PostItem
        post={post}
        loggedInUserId={nonOwnerUserId}
        onDelete={onDelete}
        onUpdate={onUpdate}
      />
    );

    fireEvent.click(screen.getByText("Delete"));

    expect(onDelete).not.toHaveBeenCalled();
  });

  test("handles edit correctly for the post owner", () => {
    render(
      <PostItem
        post={post}
        loggedInUserId={loggedInUserId}
        onDelete={onDelete}
        onUpdate={onUpdate}
      />
    );

    fireEvent.click(screen.getByText("Edit"));

    expect(screen.getByDisplayValue("Hello, world!")).toBeInTheDocument();
    expect(screen.getByText("Save")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
  });

  test("does not handle edit for non-owner", () => {
    const nonOwnerUserId = "54321";

    render(
      <PostItem
        post={post}
        loggedInUserId={nonOwnerUserId}
        onDelete={onDelete}
        onUpdate={onUpdate}
      />
    );

    fireEvent.click(screen.getByText("Edit"));

    expect(screen.queryByDisplayValue("Hello, world!")).not.toBeInTheDocument();
    expect(screen.queryByText("Save")).not.toBeInTheDocument();
    expect(screen.queryByText("Cancel")).not.toBeInTheDocument();
  });
});
