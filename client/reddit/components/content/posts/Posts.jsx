import React, { useState, useEffect } from "react";
import axios from "axios"; // Importing Axios

import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import ShareIcon from "@mui/icons-material/Share";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Button from "../../button/Button";
import Video from "../../video/Video"; // If you're displaying video

import "./Posts.css";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetching posts data from backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/home") // Make sure this matches your backend endpoint
      .then((response) => {
        setPosts(response.data); // Set the fetched posts to state
        setLoading(false); // Data is loaded
      })
      .catch((err) => {
        setError("Error fetching posts.");
        setLoading(false); // Data loading finished (with error)
      });
  }, []); // Empty dependency array, so this runs only once when the component mounts

  return (
    <div className="posts-wrapper">
      {loading ? (
        <p>Loading posts...</p> // Loading indicator
      ) : error ? (
        <p>{error}</p> // Show error message if something goes wrong
      ) : (
        posts.map((post, index) => (
          <div className="post" key={index}>
            <div className="post-sidebar">
              <ArrowUpwardIcon className="upvote" />
              <span>{post.upvotes.length}</span>
              <ArrowDownwardIcon className="downvote" />
            </div>
            <div className="post-title">
              <img src={post.communityID.image_src || "default_image.jpg"} alt={`Subreddit ${post.communityID.name}`} />
              <span className="subreddit-name">r/{post.communityID.name}</span>
              <span className="post-user">Posted by</span>
              <span className="post-user underline">u/{post.userID.username}</span>
              <div className="spacer"></div>
              <Button label="+ JOIN" />
            </div>
            <div className="post-body">
              <span className="title">{post.title}</span>
              {post.mediaType === 'video' && <Video src={post.mediaUrl} duration={post.duration} />}
              {post.mediaType !== 'video' && post.mediaUrl && <img src={post.mediaUrl} alt={post.title} />}
              {post.content && <span className="description">{post.content}</span>}
            </div>
            <div className="post-footer">
              <div className="comments footer-action">
                <ModeCommentIcon className="comment-icon" />
                <span>{post.comments.length} Comments</span>
              </div>
              <div className="share footer-action">
                <ShareIcon />
                <span>Share</span>
              </div>
              <div className="save footer-action">
                <BookmarkIcon />
                <span>Save</span>
              </div>
              <MoreHorizIcon className="more-icon footer-action" />
            </div>
          </div>
        ))
      )}
    </div>
  );
}
