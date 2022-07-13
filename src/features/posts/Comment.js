import React, { useEffect, useState } from "react";
import { useGetUsersQuery, useRemoveCommentMutation } from "../api/apiSlice";
import { UserPhoto } from "../users/UserPhoto";
import Proptypes from "prop-types";
import { formatDistanceToNow } from "date-fns";
import styles from "../../styles/Comment.module.css";
import { CommentOptionsCard } from "./CommentOptionsCard";
import { useSelector } from "react-redux";
import { selectUserById } from "../users/usersSlice";

const Comment = ({ userId, content, id, date }) => {
  // get the name of who posted comment
  const { data: users } = useGetUsersQuery();
  let foundUser;
  if (users) {
    foundUser = users.find((user) => user.id === userId);
  }

  const formattedDate = formatDistanceToNow(new Date(date));
  const [showCard, setShowCard] = useState(false);
  const toggleCard = () => setShowCard(!showCard ? true : false);
  const [removeComment] = useRemoveCommentMutation();
  const deleteComment = async () => {
    try {
      await removeComment({ commentId: id }).unwrap();
    } catch (err) {
      console.error("could not delete comment at Comment.js: ", err);
    }
  };
  return (
    <div className={styles.mainContainer}>
      {showCard && <CommentOptionsCard deleteComment={deleteComment} />}
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
        <div role="button" className={styles.optionsBtn} onClick={toggleCard}>
          <div className={styles.iconContainer}>
            <i></i>
          </div>
        </div>
        <div className={styles.likeReplyContainer}>
          <div className={styles.actions} role="button">Like</div>
          <div className={styles.actions} role="button">Reply</div>
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
