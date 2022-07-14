import React, { useEffect, useState } from "react";
import { useEditCommentMutation, useGetUsersQuery, useRemoveCommentMutation } from "../api/apiSlice";
import { UserPhoto } from "../users/UserPhoto";
import Proptypes from "prop-types";
import { formatDistanceToNow } from "date-fns";
import styles from "../../styles/Comment.module.css";
import { CommentOptionsCard } from "./CommentOptionsCard";


const Comment = ({ userId, content, id, date }) => {
  // get the name of who posted comment
  const { data: users } = useGetUsersQuery();
  const [editComment] = useEditCommentMutation();
  let foundUser;
  if (users) {
    foundUser = users.find((user) => user.id === userId);
  }

  const formattedDate = formatDistanceToNow(new Date(date));
  const [showCard, setShowCard] = useState(false);
  const [cardPosition, setCardPosition] = useState({ x: 0, y: 0 });
  const toggleCard = (e) => {
    const optionsBtn = document.querySelector(
      `div[name='comment-options-btn'][data-id='${id}']`
    );

    const mainContainer = document.querySelector(
      `div[name='main-comment-container'][data-id=${id}]`
    );
    const mainRect = mainContainer.getBoundingClientRect();

    const rect = optionsBtn.getBoundingClientRect();
    setCardPosition({
      x: rect.left - mainRect.left,
      y: rect.top - mainRect.top,
    });
    setShowCard(!showCard ? true : false);
  };

  const [removeComment] = useRemoveCommentMutation();
  const deleteComment = async () => {
    try {
      await removeComment({ commentId: id }).unwrap();
    } catch (err) {
      console.error("could not delete comment at Comment.js: ", err);
    }
  };

  const changeComment = async () => {
    try {
      toggleCard();
    } catch (err) {
      console.error('error editing comment', err);
    }
  }
  return (
    <div
      className={styles.mainContainer}
      name="main-comment-container"
      data-id={id}
    >
      {showCard && (
        <CommentOptionsCard
          deleteComment={deleteComment}
          position={cardPosition}
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
              <p className={styles.contentContainer}>{content}</p>
            </div>
          </div>
        </div>
        <div
          role="button"
          className={styles.optionsBtn}
          onClick={(e) => toggleCard(e)}
          name="comment-options-btn"
          data-id={id}
        >
          <div className={styles.iconContainer}>
            <i></i>
          </div>
        </div>
        <div className={styles.likeReplyContainer}>
          <div className={styles.actions} role="button">
            Like
          </div>
          <div className={styles.actions} role="button">
            Reply
          </div>
          <div className={styles.date}>{formattedDate}</div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

Comment.propTypes = {
  userId: Proptypes.string,
  content: Proptypes.string,
  id: Proptypes.string,
  date: Proptypes.string,
};

export { Comment };
