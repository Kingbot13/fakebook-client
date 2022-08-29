import React, { useEffect, useState } from "react";
import { Comment } from "./Comment";
import Proptypes from "prop-types";
import styles from "../../styles/CommentList.module.css";
import { CommentInput } from "./CommentInput";
const CommentList = ({
  comments,
  commentId,
  showCard,
  position,
  toggleCard,
  show,
  toggleEdit,
  onFocus,
  isReply,
  handleSubmit,
  onChange,
  value,
  toggleInput,
  showInput,
  handleReplyChange,
  id,
}) => {
  const [content, setContent] = useState("");
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
        reactions={comment.data.reactions}
        isReply={isReply}
        commentId={commentId}
        show={show}
        handleSubmit={handleSubmit}
        onChange={onChange}
        value={value}
        toggleInput={toggleInput}
        showInput={showInput}
        handleReplyChange={handleReplyChange}
        onFocus={onFocus}
        parentCommentId={id}
      />
    );
  });

  const replyInput = document.querySelector(`input[data-id="${id}"]`);

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  useEffect(() => {
    if (commentId) {
      const commentContent = document.querySelector(
        `p[data-id='${commentId}']`
      );
      setContent(commentContent.textContent);
    }
  }, [commentId]);
  return (
    <div className={styles.mainContainer}>
      {show && (
        <CommentInput
          onChange={handleChange}
          onFocus={onFocus}
          value={content}
          id={id}
        />
      )}
      <div>{mapComments}</div>
    </div>
  );
};

CommentList.propTypes = {
  comments: Proptypes.array,
};

export { CommentList };
