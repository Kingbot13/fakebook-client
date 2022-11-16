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
  replyContent,
  setShowCard,
}) => {
  const [content, setContent] = useState("");
  const sortedComments = [...comments];
  sortedComments.sort((a, b) => new Date(a.date) - new Date(b.date));
  const mapComments = sortedComments.map((comment) => {
    return (
      <Comment
        key={comment._id}
        content={comment.content}
        userId={comment.user._id}
        id={comment._id}
        author={comment.user}
        date={comment.date}
        showCard={showCard}
        position={position}
        toggleCard={toggleCard}
        toggleEdit={toggleEdit}
        reactions={comment.reactions}
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
        replyContent={replyContent}
        setShowCard={setShowCard}
      />
    );
  });

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
      <div>{mapComments}</div>
    </div>
  );
};

CommentList.propTypes = {
  comments: Proptypes.array,
};

export { CommentList };
