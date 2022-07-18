import React from "react";
import { Comment } from "./Comment";
import Proptypes from "prop-types";
import styles from "../../styles/CommentList.module.css";
import { CommentInput } from "./CommentInput";

const CommentList = ({ comments, commentId, showCard, position, toggleCard, show, toggleEdit, onFocus, onChange, value }) => {
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
        showCard={showCard}
        position={position}
        toggleCard={toggleCard}
        toggleEdit={toggleEdit}
      />
    );
  });
  let filteredComment;
  if (commentId) {
    filteredComment = sortedComments.filter(item => item.id === commentId);
  }
  return (
    <div>
      <hr className={styles.divider} />
      {show && <CommentInput onChange={(e) => onChange(e)} onFocus={(e) => onFocus(e, filteredComment.data.content)} value={value} />}
      <div>{mapComments}</div>
    </div>
  );
};

CommentList.propTypes = {
  comments: Proptypes.array,
};

export { CommentList };
