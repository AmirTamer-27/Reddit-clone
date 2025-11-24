const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  content: String,
  mediaUrl: { type: String, default: "" }, // The link to the image/video
  mediaType: { 
    type: String, 
    enum: ["image", "video", "none"], 
    default: "none" 
  },

  postID: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
  userID: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  downvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  awardsReceived: [{
      awardName: { type: String, required: true },
      givenBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      givenAt: { type: Date, default: Date.now } 
    }]
}, { timestamps: true });

module.exports = mongoose.model("Comment", CommentSchema);
