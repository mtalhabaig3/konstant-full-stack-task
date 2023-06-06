// PostItem.js
import React, { useState } from "react";
import "./PostItem.css";

const PostItem = ({ post, loggedInUserId, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedMessage, setUpdatedMessage] = useState(post.message);

  const handleDelete = () => {
    // Only allow the owner of the post to delete it
    if (post.userId === loggedInUserId) {
      onDelete(post.id);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setUpdatedMessage(post.message);
  };

  const handleUpdate = () => {
    setIsEditing(false);
    onUpdate(post.id, updatedMessage);
  };

  const handleInputChange = (e) => {
    setUpdatedMessage(e.target.value);
  };

  return (
    <div className="post-item-container">
      <h4 className="post-item-username">{post.username}</h4>
      {isEditing ? (
        <>
          <textarea
            value={updatedMessage}
            onChange={handleInputChange}
            className="post-item-textarea"
          />
          <button onClick={handleUpdate} className="post-item-button">
            Save
          </button>
          <button onClick={handleCancelEdit} className="post-item-button">
            Cancel
          </button>
        </>
      ) : (
        <>
          <p className="post-item-message">{post.message}</p>
          <p className="post-item-time-stamp">{post.timestamp}</p>
          {post.userId === loggedInUserId && (
            <>
              <button onClick={handleEdit} className="post-item-button">
                Edit
              </button>
              <button onClick={handleDelete} className="post-item-button">
                Delete
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default PostItem;
