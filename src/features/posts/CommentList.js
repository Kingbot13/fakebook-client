import React from "react";
import { Comment } from "./Comment";
import Proptypes from "prop-types";

const CommentList = ({ comments }) => {
  const sortedComments = [...comments];
  sortedComments.sort((a, b) => new Date(a.date) - new Date(b.date));
  const mapComments = sortedComments.map((comment) => {
    return (
      <Comment
        key={comment.id}
        content={comment.content}
        userId={comment.userId}
        id={comment.id}
        date={comment.date}
      />
    );
  });
  return <div>{mapComments}</div>;
};

CommentList.propTypes = {
  comments: Proptypes.array,
};

export { CommentList };
