// PostList.js
import React from "react";
import PostItem from "./PostItem";

const PostList = ({ posts, loggedInUserId, onDelete, onUpdate }) => {
  return (
    <div>
      <h2>Post List</h2>
      {posts.map((post) => (
        <PostItem
          key={post.id}
          post={post}
          loggedInUserId={loggedInUserId}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
};

export default PostList;
