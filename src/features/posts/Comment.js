import React, { useEffect, useState } from "react";
import { useGetUsersQuery, useRemoveCommentMutation } from "../api/apiSlice";
import { UserPhoto } from "../users/UserPhoto";
import Proptypes from "prop-types";
import { formatDistanceToNow } from "date-fns";
import styles from "../../styles/Comment.module.css";
import { CommentOptionsCard } from "./CommentOptionsCard";
import { useSelector } from "react-redux";
import { selectUserById } from "../users/usersSlice";
import { DocumentReference } from "firebase/firestore";

const Comment = ({ userId, content, id, date }) => {
  // get the name of who posted comment
  const { data: users } = useGetUsersQuery();
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

  useEffect(() => {
    if (showCard) {
      const optionsCard = document.querySelector(
        "div[name='comment-options-container']"
      );
      optionsCard.style.top = cardPosition.y;
      optionsCard.style.left = cardPosition.x;
      console.log(optionsCard.style.top);
    }
  }, [showCard]);
  const [removeComment] = useRemoveCommentMutation();
  const deleteComment = async () => {
    try {
      await removeComment({ commentId: id }).unwrap();
    } catch (err) {
      console.error("could not delete comment at Comment.js: ", err);
    }
  };
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
