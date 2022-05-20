import React from "react";
import { StyledImg } from "../../components/Image";

export const Post = ({ name, content, photo }) => {
  return (
    <div>
      <div>
        <div>
          <StyledImg src={photo} alt="" />
        </div>
        <div>{name}</div>
        <div>...</div>
      </div>
      <p>{content}</p>
    </div>
  );
};
