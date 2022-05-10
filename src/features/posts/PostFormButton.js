import React from "react";
import { UserPhoto } from "../users/UserPhoto";

export const PostFormButton = ({ onClick }) => {
  return (
    <div>
      <UserPhoto />
      <button name="toggle-form" type="button" onClick={() => onClick()}>
        What's on your mind?
      </button>
    </div>
  );
};
