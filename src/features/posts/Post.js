import { formatDistanceToNow } from "date-fns";
import React, { useState } from "react";
import { StyledImg } from "../../components/Image";
import styles from "../../styles/Post.module.css";
import {
  useAddCommentMutation,
  useAddReactionMutation,
  useRemoveReactionMutation,
} from "../api/apiSlice";
import Proptypes from "prop-types";
import { auth } from "../../firebase";
import { CommentInput } from "./CommentInput";
import { CommentList } from "./CommentList";
import { PostOptionsCard } from "./PostOptionsCard";

const Post = ({ name, content, photo, date, id, reactions, comments }) => {
  const formattedDate = formatDistanceToNow(new Date(date));
  const [addReaction] = useAddReactionMutation();
  const [removeReaction] = useRemoveReactionMutation();
  const [addComment] = useAddCommentMutation();
  const [value, setValue] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const userId = auth.currentUser.uid;
  const toggleReaction = async (e) => {
    try {
      const thumbsUp = document.querySelector("i");
      const reactionName = document.querySelector("div[name='reaction-name']");
      if (!reactions || !reactions.likes.usersReacted.includes(userId)) {
        await addReaction({ id, reaction: "likes", userId }).unwrap();
        thumbsUp.classList.add("blue-filter");
        reactionName.classList.add("blue-filter");
      } else if (reactions.likes.usersReacted.includes(userId)) {
        await removeReaction({ id, reaction: "likes", userId }).unwrap();
        thumbsUp.classList.remove("blue-filter");
        reactionName.classList.remove("blue-filter");
      }
    } catch (err) {
      console.error(err);
    }
  };
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const handleSubmit = async (e) => {
    try {
      const keyEvent = async (e) => {
        if (e.code === "Enter") {
          await addComment({ userId, content: value, postId: id }).unwrap();
          document.removeEventListener("keydown", keyEvent);
        }
      };
      await keyEvent();
    } catch (err) {
      console.error("error submitting comment: ", err);
    }
  };
  const toggleOptionsCard = () => {
    setShowOptions(!showOptions ? true : false);
  }
  return (
    <div className={styles.container}>
      {showOptions && <PostOptionsCard />}
      <div className={styles.user}>
        <div>
          <StyledImg src={photo} alt="" />
        </div>
        <div className={styles.nameContainer}>
          <strong>{name}</strong>
          <div className={styles.time}>{formattedDate}</div>
        </div>
        <div role='button' onClick={toggleOptionsCard} className={styles.options}>...</div>
      </div>
      <p className={styles.content}>{content}</p>
      <div>
        <div
          role="presentation"
          name="reactions"
          className={styles.displayedReactions}
        >
          {(reactions && reactions.likes.likes) || 0}
        </div>
        <div className={styles.reactionContainer}>
          <div
            className={styles.secondaryContainer}
            onClick={toggleReaction}
            data-id={id}
            role="button"
            name="like-button"
          >
            <div className={styles.likeContainer}>
              <i className={styles.likeButton}></i>
            </div>
            <div name="reaction-name" className={styles.likeContainer}>
              Like
            </div>
          </div>
          <div className={styles.secondaryContainer}>comment</div>
          <div className={styles.secondaryContainer}>Share</div>
        </div>
      </div>
      {comments && <CommentList comments={comments} />}
      <CommentInput
        value={value}
        onChange={handleChange}
        onFocus={handleSubmit}
      />
    </div>
  );
};

Post.propTypes = {
  name: Proptypes.string,
  content: Proptypes.string,
  photo: Proptypes.string,
  date: Proptypes.string,
  id: Proptypes.string,
  reactions: Proptypes.object,
};

export { Post };
