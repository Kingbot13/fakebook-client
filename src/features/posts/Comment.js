import React, { useState } from "react";
import { useGetUsersQuery, useRemoveCommentMutation } from "../api/apiSlice";
import { UserPhoto } from "../users/UserPhoto";
import Proptypes from "prop-types";
import { formatDistanceToNow } from "date-fns";
import styles from '../../styles/Comment.module.css';
import { CommentOptionsCard } from "./CommentOptionsCard";

const Comment = ({ userId, content, id, date }) => {
  // get the name of who posted comment
  const { data: users } = useGetUsersQuery();
  const foundUser = users.find((user) => user.id === userId);
  const name = foundUser.data.name;
  const formattedDate = formatDistanceToNow(new Date(date));
  const [showCard, setShowCard] = useState(false);
  const toggleCard = () => setShowCard(!showCard ? true : false);
  const [removeComment] = useRemoveCommentMutation();
  const deleteComment = async () => {
    try {
      await removeComment({commentId: id}).unwrap();
    } catch (err) {
      console.error("could not delete comment at Comment.js: ", err);
    }
  }
  return (
    <div>
      {showCard && <CommentOptionsCard deleteComment={deleteComment}/>}
      <UserPhoto />
      <div>
        <div>
          <div>
            <div>{name}</div>
            <p>{content}</p>
          </div>
        </div>
      </div>
      <div>
        <div role='button'>Like</div>
        <div role='button'>Reply</div>
        <div>{formattedDate}</div>
      </div>
      <div>
        <div role='button'className={styles.optionsBtn} onClick={toggleCard}>
          <i/>
        </div>
      </div>
    </div>
  );
};

Comment.propTypes = {
  userId: Proptypes.string,
  content: Proptypes.string,
  id: Proptypes.string,
  date: Proptypes.string
};

export { Comment };
