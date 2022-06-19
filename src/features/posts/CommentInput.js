import React from "react";
import { UserPhoto } from "../users/UserPhoto";

export const CommentInput = ({ onClick }) => {
  return (
    <div>
      <UserPhoto />
      <input name="comment-input" type="text" onClick={() => onClick()}>
        Write a comment...
      </input>
    </div>
  );
};
