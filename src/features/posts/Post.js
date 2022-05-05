import React from "react";

export const Post = ({ name, content, photo }) => {
  return (
    <div>
      <div>
        <div>
          <img src={photo} alt="" />
        </div>
        <div>{name}</div>
        <div>...</div>
      </div>
      <p>{content}</p>
    </div>
  );
};
