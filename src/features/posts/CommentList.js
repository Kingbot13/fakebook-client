import React from "react";
import { Comment } from "./Comment";
import Proptypes from "prop-types";
import styles from "../../styles/CommentList.module.css";

const CommentList = ({ comments }) => {
  const sortedComments = [...comments];
  sortedComments.sort((a, b) => new Date(a.data.date) - new Date(b.data.date));
  const mapComments = sortedComments.map((comment) => {
    return (
      <Comment
        key={comment.id}
        content={comment.data.content}
        userId={comment.data.userId}
        id={comment.id}
        date={comment.data.date}
      />
    );
  });
  return (
    <div>
      <hr className={styles.divider} />
      <div>{mapComments}</div>
    </div>
  );
};

CommentList.propTypes = {
  comments: Proptypes.array,
};

export { CommentList };
