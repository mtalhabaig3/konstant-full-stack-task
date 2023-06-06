// PostList.js
import React from "react";
import PostItem from "../PostItem/PostItem";
import "./PostList.css";

const PostList = ({ posts, loggedInUserId, onDelete, onUpdate }) => {
  return (
    <div className="post-list-container">
      <h2 className="post-list-title">Messages:</h2>

      {posts ? (
        posts.map((post) => (
          <PostItem
            key={post.id}
            post={post}
            loggedInUserId={loggedInUserId}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        ))
      ) : (
        <>
          {console.log("displaying p")}
          <p className="post-list-p">Add a Message!</p>
        </>
      )}
    </div>
  );
};

export default PostList;
