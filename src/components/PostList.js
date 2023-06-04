// PostList.js
import React from "react";
import PostItem from "./PostItem";

const PostList = ({ posts, loggedInUserId, onDelete }) => {
  return (
    <div>
      <h2>All Posts</h2>
      {posts.map((post) => (
        <PostItem
          key={post.id}
          post={post}
          loggedInUserId={loggedInUserId}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default PostList;
