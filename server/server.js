require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./db"); 
const User = require('./models/User');
const Post = require('./models/Post');
const Comment = require('./models/Comment'); // Need this to populate comments

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

// --- API ROUTES ---

// 1. GET POSTS (Now includes Comments!)
app.get("/api/posts", async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("userID", "username")
      .populate("communityID", "name")
      // ✅ This nested populate grabs the comments AND the author of the comment
      .populate({ 
        path: "comments",
        populate: { path: "userID", select: "username" }
      })
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// 2. UPVOTE POST
app.put("/api/posts/:id/upvote", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // ⚠️ For testing: We just pick the first user in the DB to be the "Upvoter"
    const testUser = await User.findOne(); 

    // Simple logic: If not upvoted, add upvote. If already upvoted, do nothing (or toggle)
    if (!post.upvotes.includes(testUser._id)) {
      post.upvotes.push(testUser._id);
      await post.save();
    }
    res.json(post); // Send back updated post
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// 3. GIVE AWARD
app.put("/api/posts/:id/award", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const testUser = await User.findOne(); // The person giving the award

    const newAward = {
      awardName: "Gold", // Defaulting to Gold for this demo
      givenBy: testUser._id,
      givenAt: new Date()
    };

    post.awardsReceived.push(newAward);
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));