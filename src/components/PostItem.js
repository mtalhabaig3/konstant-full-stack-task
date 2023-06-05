// PostItem.js
import React, { useState } from "react";

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
    <div>
      <h4>{post.username}</h4>
      {isEditing ? (
        <>
          <textarea value={updatedMessage} onChange={handleInputChange} />
          <button onClick={handleUpdate}>Save</button>
          <button onClick={handleCancelEdit}>Cancel</button>
        </>
      ) : (
        <>
          <p>{post.message}</p>
          <p>{post.timestamp}</p>
          {post.userId === loggedInUserId && (
            <>
              <button onClick={handleEdit}>Edit</button>
              <button onClick={handleDelete}>Delete</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default PostItem;
