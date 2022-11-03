import { formatDistanceToNow } from "date-fns";
import React, { useEffect, useState } from "react";
import styles from "../../styles/Post.module.css";
import {
  useAddCommentMutation,
  useUpdateReactionMutation,
  useDeletePostMutation,
  useEditPostMutation,
  useGetCommentsQuery,
  useEditCommentMutation,
  useAddReplyMutation,
  useEditReplyMutation,
  useRemoveReplyMutation,
  useAddPostMutation,
  useGetPostsQuery,
  useGetCurrentUserQuery,
} from "../api/apiSlice";
import Proptypes from "prop-types";
import { CommentInput } from "./CommentInput";
import { CommentList } from "./CommentList";
import { PostOptionsCard } from "./PostOptionsCard";
import { PostForm } from "./PostForm";
import { Divider } from "../../components/Divider";
import { UpperPost } from "../../components/UpperPost";

const Post = ({
  name,
  content,
  photo,
  profilePhoto,
  date,
  id,
  reactions,
  userProp,
  share,
  shareId,
}) => {
  const { data: userData, isError, isSuccess } = useGetCurrentUserQuery();
  const { user } = userData;
  const formattedDate = formatDistanceToNow(new Date(date));
  const postInfo = {
    name: name,
    content: content,
    photo: photo,
    date: formattedDate,
    id: id,
    reactions: reactions,
  };
  const { data: postsData } = useGetPostsQuery();
  const posts = postsData.posts;
  let filteredPost;
  if (posts && share) {
    const filteredPostArray = posts.filter((post) => post._id === shareId);
    filteredPost = filteredPostArray[0];
  }
  const { data: comments } = useGetCommentsQuery();

  let filteredComments;
  if (comments) {
    filteredComments = comments.comments.filter((item) => item.postId === id);
  }
  const [addPost] = useAddPostMutation();
  const [updateReaction] = useUpdateReactionMutation();
  const [addComment] = useAddCommentMutation();
  const [editComment] = useEditCommentMutation();
  const [editPost] = useEditPostMutation();
  const [deletePost] = useDeletePostMutation();
  const [addReply] = useAddReplyMutation();
  const [editReply] = useEditReplyMutation();
  const [value, setValue] = useState("");
  const [replyContent, setReplyContent] = useState("");
  // set state for current user data
  const [userState, setUserState] = useState({});
  const [contentData, setContentData] = useState(content);
  const [isReplyBool, setIsReplyBool] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [showShareForm, setShowShareForm] = useState(false);

  const [cardPosition, setCardPosition] = useState({ x: 0, y: 0 });
  // set commentId to use when editing comments
  const [commentId, setCommentId] = useState("");
  // toggle comment options card
  const toggleCard = (id) => {
    // set commentId as soon as commentOptionsCard is toggled
    setCommentId(id);
    console.log(commentId);
    const optionsBtn = document.querySelector(
      `div[name='comment-options-btn'][data-id='${id}']`
    );
    // main comment container
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
    setShowInput(false);
    // document.addEventListener("click", (e) => clickOff(e));
  };
  // toggle input used for editing replies and comments
  const toggleInput = (activeInputId) => {
    setShowInput(!showInput ? true : false);
    setReplyContent(
      document.querySelector(`p[data-id="${activeInputId}"]`).textContent
    );

    setShowCard(false);
    // if (activeInputId) {
    //   const el = document.querySelector(`input[data-id="${activeInputId}"]`);
    //   console.log(el);
    //   document.querySelector(`input[data-id="${activeInputId}"]`).focus();
    // }
  };
  // toggle input used to create new replies
  const toggleReplyInput = (id) => {
    setShowReplyInput(!showReplyInput ? true : false);

    console.log(showReplyInput);

    setShowCard(false);
  };

  // const clickOff = (e) => {
  //   const comment = document.querySelector(`p[data-id="${commentId}"]`);
  //   if (e.target !== comment && showCard) {
  //     setShowCard(false);
  //     e.target.removeEventListener("click", clickOff);
  //   } else if (!showCard) {
  //     e.target.removeEventListener("click", clickOff);
  //   }
  // };

  const toggleReaction = async (e) => {
    try {
      const thumbsUp = document.querySelector(
        `i[name='like-icon'][data-id='${id}']`
      );
      const reactionName = document.querySelector(
        `div[name='reaction-name'][data-id='${id}']`
      );
      if (!reactions || !reactions.find((item) => item.id === user._id)) {
        await updateReaction({ id, reaction: "like", user: user._id }).unwrap();
        thumbsUp.classList.remove("like-btn");
        thumbsUp.classList.add("blue-filter", "solid-like-btn");
        reactionName.classList.add("blue-filter");
      } else if (reactions.find((item) => item.id === user._id)) {
        await updateReaction({ id, user: user._id, reaction: "like" }).unwrap();
        thumbsUp.classList.remove("blue-filter", "solid-like-btn");
        thumbsUp.classList.add("like-btn");
        reactionName.classList.remove("blue-filter");
      } else {
        throw new Error("could not update reaction");
      }
    } catch (err) {
      console.error(err);
    }
  };
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const keyEvent = async (e, action, content, isReply, idForReply) => {
    try {
      if (isReply === undefined || !isReply) {
        if (e.code === "Enter") {
          if (action === "add") {
            await addComment({
              user: user._id,
              content: value,
              postId: id,
              date: Date(),
            }).unwrap();
          } else if (action === "edit") {
            await editComment({ id: commentId, content }).unwrap();
          } else {
            throw new Error("action in keyEvent function not set");
          }
          e.target.removeEventListener("keydown", keyEvent);
          setShowCard(false);
          setShowInput(false);
          setShowReplyInput(false);
          setValue("");
          setReplyContent("");
        }
      } else {
        if (e.code === "Enter") {
          if (action === "add") {
            await addReply({
              user: user._id,
              content: replyContent,
              commentId: idForReply,
              date: Date(),
            }).unwrap();
          } else if (action === "edit") {
            await editReply({ id: commentId, content }).unwrap();
          } else {
            throw new Error("action in keyEvent function not set");
          }
          e.target.removeEventListener("keydown", keyEvent);
          setShowCard(false);
          setShowInput(false);
          setShowReplyInput(false);
          setValue("");
          setReplyContent("");
        }
      }
    } catch (err) {
      console.error("issue with keyEvent function: ", err);
    }
  };

  const toggleCommentInput = () => {
    setIsReplyBool(!isReplyBool ? true : false);
    if (!isReplyBool) document.querySelector(`input[data-id="${id}"]`).focus();
  };

  const handleCommentEdit = (e, content, isReply) => {
    e.target.addEventListener("keydown", keyEvent(e, "edit", content, isReply));
  };

  const handleSubmit = (e, content, isReply, idForReply) => {
    e.target.addEventListener(
      "keydown",
      keyEvent(e, "add", content, isReply, idForReply)
    );
  };
  const toggleOptionsCard = () => {
    setShowOptions(!showOptions ? true : false);
  };
  const togglePostForm = () => {
    setShowForm(!showForm ? true : false);
    setShowOptions(false);
  };
  const toggleShareForm = () => {
    setShowShareForm(!showShareForm ? true : false);
  };
  const handleEditPostSubmit = async () => {
    try {
      await editPost({ postId: id, content: contentData }).unwrap();
      togglePostForm();
    } catch (err) {
      console.error("problem submitting post edit: ", err);
    }
  };
  const handleContentChange = (e) => {
    setContentData(e.target.value);
  };

  const handleReplyChange = (e) => {
    setReplyContent(e.target.value);
  };

  const handleShareSubmit = async () => {
    try {
      await addPost({
        name: user.username,
        content: value,
        photo: null,
        id: user.id,
        date: Date(),
        share: true,
        shareId: id,
      }).unwrap();
      setValue("");
      toggleShareForm();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeletePost = async () => {
    try {
      await deletePost({ postId: id }).unwrap();
    } catch (err) {
      console.error("problem handling post deletion: ", err);
    }
  };

  useEffect(() => {
    // set userState when data is finished fetching
    if (isError) {
      throw new Error("error fetching user");
    }
    if (user) {
      setUserState({
        id: user._id,
        username: `${user.firstName} ${user.lastName}`,
      });
    }
  }, [user]);

  // if user.id is contained in reactions array, render like button with blue filter and solid thumb image
  useEffect(() => {
    if (reactions && reactions.find((item) => item.id === user.id)) {
      const thumbsUp = document.querySelector(
        `i[name='like-icon'][data-id='${id}']`
      );
      const reactionName = document.querySelector(
        `div[name='reaction-name'][data-id='${id}']`
      );
      thumbsUp.classList.remove("like-btn");
      thumbsUp.classList.add("blue-filter", "solid-like-btn");
      reactionName.classList.add("blue-filter");
    }
  }, [reactions, user.id]);

  return (
    <div className={styles.container}>
      {showOptions && (
        <PostOptionsCard
          toggleForm={togglePostForm}
          deletePost={handleDeletePost}
        />
      )}
      {showForm && (
        <PostForm
          title="Edit post"
          content={contentData}
          handleChange={handleContentChange}
          handleSubmit={handleEditPostSubmit}
          toggle={togglePostForm}
        />
      )}
      {showShareForm && (
        <PostForm
          title="Create post"
          content={value}
          handleChange={handleChange}
          handleSubmit={handleShareSubmit}
          share={true}
          postInfo={postInfo}
          toggle={toggleShareForm}
        />
      )}
      <UpperPost
        name={name}
        photo={photo}
        profilePhoto={profilePhoto}
        formattedDate={formattedDate}
        toggleOptionsCard={toggleOptionsCard}
        content={content}
        share={share}
        shareId={shareId}
        filteredPost={filteredPost}
        id={id}
        user={user}
        userId={user.id}
      />
      <div>
        <div
          role="presentation"
          name="reactions"
          className={styles.displayedReactions}
        >
          {reactions && reactions.length ? reactions.length : 0}
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
              <i name="like-icon" data-id={id} className="like-btn"></i>
            </div>
            <div
              name="reaction-name"
              data-id={id}
              className={styles.likeContainer}
            >
              Like
            </div>
          </div>
          <div
            className={styles.secondaryContainer}
            role="button"
            onClick={toggleCommentInput}
          >
            <div className={styles.likeContainer}>
              <i className={styles.commentIcon}></i>
            </div>
            <div className={styles.likeContainer}>Comment</div>
          </div>
          <div className={styles.secondaryContainer} onClick={toggleShareForm}>
            <div className={styles.likeContainer}>
              <i className={styles.shareIcon}></i>
            </div>
            <div className={styles.likeContainer}>Share</div>
          </div>
        </div>
      </div>
      <Divider />
      {comments && (
        <CommentList
          handleSubmit={handleSubmit}
          commentId={commentId}
          toggleEdit={toggleInput}
          onFocus={handleCommentEdit}
          onChange={handleChange}
          value={value}
          comments={filteredComments}
          showCard={showCard}
          position={cardPosition}
          toggleCard={toggleCard}
          show={showInput}
          showInput={showReplyInput}
          setShowInput={setShowReplyInput}
          setReplyContent={setReplyContent}
          replyContent={replyContent}
          toggleInput={toggleReplyInput}
          handleReplyChange={handleReplyChange}
          setShowCard={setShowCard}
        />
      )}

      <CommentInput
        value={value}
        onChange={handleChange}
        onFocus={handleSubmit}
        id={id}
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
  reactions: Proptypes.array,
};

export { Post };
