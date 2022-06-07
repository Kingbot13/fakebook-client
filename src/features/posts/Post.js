import { formatDistanceToNow } from "date-fns";
import React from "react";
import { StyledImg } from "../../components/Image";
import styles from "../../styles/Post.module.css";
import { useAddReactionMutation } from "../api/apiSlice";
import Proptypes from 'prop-types';

const Post = ({ name, content, photo, date, id, reactions }) => {
  const formattedDate = formatDistanceToNow(new Date(date));
  const addReaction = useAddReactionMutation();
  const toggleReaction = async (e) => {
    try {
      const newLike = reactions.likes + 1;
      await addReaction({ id, reaction: { likes: newLike } }).unwrap();
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <div>
          <StyledImg src={photo} alt="" />
        </div>
        <div className={styles.nameContainer}>
          <strong>{name}</strong>
          <div className={styles.time}>{formattedDate}</div>
        </div>
        <div className={styles.options}>...</div>
      </div>
      <p className={styles.content}>{content}</p>
      <div>
        <div className={styles.displayedReactions}>{reactions.likes}</div>
        <div className={styles.reactionContainer}>
          <div
            className={styles.secondaryContainer}
            onClick={toggleReaction}
            data-id={id}
            role="button"
          >
            <div className={styles.likeContainer}>
              <i className={styles.likeButton}></i>
            </div>
            <div className={styles.likeContainer}>Like</div>
          </div>
          <div className={styles.secondaryContainer}>comment</div>
          <div className={styles.secondaryContainer}>Share</div>
        </div>
      </div>
    </div>
  );
};

Post.propTypes = {
  name: Proptypes.string,
  content: Proptypes.string,
  photo: Proptypes.string,
  date: Proptypes.string,
  id: Proptypes.string,
  reactions: Proptypes.object
}

export {Post};
