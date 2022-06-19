import React from "react";
import { UserPhoto } from "../users/UserPhoto";

export const CommentButton = ({ onClick }) => {
  return (
    <div>
      <UserPhoto />
      <button
        name="toggle-comment-form"
        type="button"
        onClick={() => onClick()}
      >
        Write a comment...
      </button>
    </div>
  );
};
