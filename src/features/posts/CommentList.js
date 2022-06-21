import React from "react";
import { Comment } from "./Comment";
import Proptypes from "prop-types";

const CommentList = ({ comments }) => {
  const mapComments = comments.map((comment) => {
    return (
      <Comment
        key={comment.id}
        content={comment.content}
        userId={comment.userId}
        id={comment.id}
      />
    );
  });
  return <div>{mapComments}</div>;
};

CommentList.propTypes = {
  comments: Proptypes.array,
};

export { CommentList };
