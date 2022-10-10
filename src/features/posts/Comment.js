import React, { useEffect, useState } from "react";
import { useGetUsersQuery, useRemoveCommentMutation } from "../api/apiSlice";
import { UserPhoto } from "../users/UserPhoto";
import Proptypes from "prop-types";
import { formatDistanceToNow } from "date-fns";
import styles from "../../styles/Comment.module.css";
import { CommentOptionsCard } from "./CommentOptionsCard";
import { StyledReactions } from "../../components/ReactionsContainer";
import { CommentList } from "./CommentList";
import { CommentInput } from "./CommentInput";
import {
  useUpdateCommentReactionMutation,
  useGetRepliesQuery,
  useAddReplyMutation,
  useRemoveReplyMutation,
  useEditReplyMutation,
} from "../api/apiSlice";
import { auth } from "../../firebase";

const Comment = ({
  userId,
  content,
  id,
  date,
  showCard,
  position,
  toggleCard,
  toggleEdit,
  reactions,
  isReply,
  commentId,
  show,
  handleSubmit,
  onFocus,
  parentCommentId,
  showInput,
  setShowInput,
  replyContent,
  setShowCard,
  toggleInput,
  handleReplyChange,
}) => {
  // get replies and filter based on comment id
  const { data: replies } = useGetRepliesQuery();
  let filteredReplies;
  if (replies) {
    filteredReplies = replies.filter((item) => item.data.commentId === id);
  }
  // get the name of who posted comment
  const { data: users } = useGetUsersQuery();
  let foundUser;
  if (users) {
    foundUser = users.find((user) => user.id === userId);
  }

  const formattedDate = formatDistanceToNow(new Date(date));

  const [removeComment] = useRemoveCommentMutation();
  const [removeReply] = useRemoveReplyMutation();
  const [updateReaction] = useUpdateCommentReactionMutation();

  const deleteComment = async () => {
    try {
      if (!isReply) {
        await removeComment({ commentId: id }).unwrap();
      } else if (isReply) {
        await removeReply({ id }).unwrap();
      }
      setShowCard(false);
    } catch (err) {
      console.error("could not delete comment at Comment.js: ", err);
    }
  };
  const toggleReaction = async () => {
    try {
      const reactionName = document.querySelector(
        `div[name='comment-reaction-name'][data-id='${id}']`
      );
      if (!reactions || !reactions.find((item) => item.id === userId)) {
        await updateReaction({
          commentId: id,
          reaction: "like",
          userId,
        }).unwrap();
        reactionName.classList.add("blue-filter");
      } else if (reactions.find((item) => item.id === userId)) {
        await updateReaction({ commentId: id, userId }).unwrap();
        reactionName.classList.remove("blue-filter");
      } else {
        throw new Error("could not update reaction");
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (reactions && reactions.find((item) => item.id === userId)) {
      const reactionName = document.querySelector(
        `div[name='comment-reaction-name'][data-id='${id}']`
      );

      reactionName.classList.add("blue-filter");
    }
  }, [reactions, userId]);

  return (
    <div
      className={styles.mainContainer}
      name="main-comment-container"
      data-id={id}
    >
      {showCard && commentId === id && (
        <CommentOptionsCard
          deleteComment={deleteComment}
          toggleEdit={toggleEdit}
          position={position}
          activeInputId={id}
        />
      )}
      <div className={styles.profileContainer}>
        <UserPhoto />
      </div>
      <div className={styles.secondaryContainer}>
        <div className={styles.commentCard}>
          <div>
            <div>
              <div className={styles.userName}>
                {users && foundUser.data.name}
              </div>
              <p className={styles.contentContainer} data-id={id}>
                {content}
              </p>
            </div>
          </div>
          {reactions && <StyledReactions reactions={reactions} />}
        </div>
        {userId === auth.currentUser.uid && (
          <div
            role="button"
            className={styles.optionsBtn}
            onClick={() => toggleCard(id)}
            name="comment-options-btn"
            data-id={id}
          >
            <div className={styles.iconContainer}>
              <i></i>
            </div>
          </div>
        )}
        <div className={styles.likeReplyContainer}>
          <div
            name="comment-reaction-name"
            className={styles.actions}
            onClick={toggleReaction}
            role="button"
            data-id={id}
          >
            Like
          </div>
          <div
            className={styles.actions}
            role="button"
            onClick={() => toggleInput()}
          >
            Reply
          </div>
          <div className={styles.date}>{formattedDate}</div>
        </div>
        <div></div>
      </div>
      {!isReply && replies && (
        <CommentList
          comments={filteredReplies}
          isReply={true}
          showCard={showCard}
          position={position}
          toggleCard={toggleCard}
          toggleEdit={toggleEdit}
          commentId={commentId}
          show={show}
          toggleInput={toggleInput}
          onFocus={onFocus}
          id={id}
          replyContent={replyContent}
          handleReplyChange={handleReplyChange}
        />
      )}
      {/* CommentInput below is used for adding new replies */}
      {showInput && commentId === id && (
        <CommentInput
          onFocus={handleSubmit}
          onChange={handleReplyChange}
          value={replyContent}
          isReply={true}
          idForReply={id}
        />
      )}
      {/* CommentInput below is used for editing current replies */}
      {show && commentId === id && (
        <CommentInput
          onChange={handleReplyChange}
          onFocus={onFocus}
          value={replyContent}
          isReply={isReply}
          id={id}
        />
      )}
    </div>
  );
};

Comment.propTypes = {
  userId: Proptypes.string,
  content: Proptypes.string,
  id: Proptypes.string,
  date: Proptypes.string,
  showCard: Proptypes.bool,
  position: Proptypes.object,
  toggleCard: Proptypes.func,
};

export { Comment };
