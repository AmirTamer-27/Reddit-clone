const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: [true, "Username is required"], 
    unique: true,
    trim: true,
    minlength: [3, "Username must be at least 3 characters"]
  },
  goldBalance: { 
    type: Number, 
    default: 100, // New users start with 0 gold
    min: [0, "Gold balance cannot be negative"] 
  },
  email: { 
    type: String, 
    required: [true, "Email is required"], 
    unique: true,
    match: [/.+\@.+\..+/, "Please enter a valid email address"], // Basic Regex validation
    lowercase: true 
  },
  password: { 
    type: String, 
    required: true, 
    minlength: [6, "Password must be at least 6 characters"] 
  },
//   isVerified: { 
//     type: Boolean, 
//     default: false 
//   },
//   verificationToken: { 
//     type: String // Stores the unique token sent to email
//   },

  joinedCommunities: [{ type: mongoose.Schema.Types.ObjectId, ref: "Community" }],
  savedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
