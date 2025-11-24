const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: String,
  content: String,
  mediaUrl: { type: String, default: "" }, // The link to the image/video
  mediaType: { 
    type: String, 
    enum: ["image", "video", "none"], 
    default: "none" 
  },

  userID: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  communityID: { type: mongoose.Schema.Types.ObjectId, ref: "Community" },

  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  downvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  awardsReceived: [{
    awardName: { type: String, required: true },
    givenBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    givenAt: { type: Date, default: Date.now } 
  }]
}, { timestamps: true });

module.exports = mongoose.model("Post", PostSchema);
