import React from "react";
import { UserPhoto } from "../users/UserPhoto";

export const CommentInput = ({ onClick, value, onChange }) => {
  return (
    <div>
      <UserPhoto />
      <input name="comment-input" type="text" onClick={() => onClick()} onChange={(e) => onChange(e)} value={value} placeholder="Write a comment..." />
    </div>
  );
};
