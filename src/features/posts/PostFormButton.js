import React from "react";

export const PostFormButton = ({ onClick }) => {
  return (
    <div>
      user profile pic
      <button name="toggle-form" type="button" onClick={() => onClick()}>
        What's on your mind?
      </button>
    </div>
  );
};
