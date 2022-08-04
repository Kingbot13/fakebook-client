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
      />
    );
  });

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  useEffect(() => {
    let filteredComment;
    if (commentId) {
      filteredComment = sortedComments.filter((item) => item.id === commentId);
      setContent(filteredComment[0].data.content);
    }
  }, [commentId]);
  return (
    <div>
      {show && (
        <CommentInput
          onChange={handleChange}
          onFocus={onFocus}
          value={content}
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
