require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const connectDB = async () => {
  try {
    // Your specific MongoDB URI
    const uri = "mongodb+srv://username:pass@redditclone.5d2hpqu.mongodb.net/?appName=redditClone";
    
    await mongoose.connect(uri);
    console.log("✅ MongoDB Connected Successfully!");
  } catch (err) {
    console.error("❌ Connection error:", err);
    process.exit(1); // Stop the app if DB fails
  }
};

// This is the magic line that fixes your error:
module.exports = connectDB;

const User = require('./models/User');
const Community = require('./models/Community');
const Post = require('./models/Post');
const Comment = require('./models/Comment');

// --- DUMMY DATA SETTINGS ---
const USER_COUNT = 5;
const COMMUNITIES = [
  { name: 'ReactDevs', description: 'The place for React hooks and components.' },
  { name: 'Photography', description: 'Sharing the best shots from around the world.' },
  { name: 'Memes', description: 'Daily dose of internet humor.' }
];

const seedData = async () => {
  try {
    // 1. Connect to DB
    connectDB();
    // 2. Clear existing data
    console.log('🧹 Clearing old data...');
    await User.deleteMany({});
    await Community.deleteMany({});
    await Post.deleteMany({});
    await Comment.deleteMany({});

    // 3. Create Users
    console.log('👤 Creating Users...');
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);

    const userDocs = [];
    for (let i = 0; i < USER_COUNT; i++) {
      userDocs.push(new User({
        username: `User_${i + 1}`,
        email: `user${i + 1}@example.com`,
        password: hashedPassword,
        goldBalance: 1000, // Give them gold so they can give awards!
        joinedCommunities: [],
        savedPosts: []
      }));
    }
    const savedUsers = await User.insertMany(userDocs);
    console.log(`✅ ${savedUsers.length} users created.`);

    // 4. Create Communities
    console.log('🏘️ Creating Communities...');
    const savedCommunities = [];

    for (const commData of COMMUNITIES) {
      // Create community with inline Roles and Awards
      const community = new Community({
        name: commData.name,
        description: commData.description,
        Roles: ["admin", "moderator", "member"], // Matches your schema capitalization
        
        // Add User 0 as Admin, User 1 as Member
        members: [
          { user: savedUsers[0]._id, role: 'admin' }, 
          { user: savedUsers[1]._id, role: 'member' }
        ],
        
        // Define Awards (Matches your schema capitalization)
        Awards: [
          { name: "Gold", cost: 100, icon: "🥇" },
          { name: "Silver", cost: 50, icon: "🥈" },
          { name: "Rocket", cost: 200, icon: "🚀" }
        ]
      });

      const savedComm = await community.save();
      savedCommunities.push(savedComm);

      // Update Users to know they joined these communities
      await User.updateMany(
        { _id: { $in: [savedUsers[0]._id, savedUsers[1]._id] } },
        { $push: { joinedCommunities: savedComm._id } }
      );
    }
    console.log(`✅ ${savedCommunities.length} communities created.`);

    // ... imports and setup keep the same ...

    // 5. Create Posts (Update the URLs here)
    console.log('📝 Creating Posts...');
    const savedPosts = [];
    const postConfigs = [
      { 
        title: "Look at my setup!", 
        type: "image", 
        // ✅ CHANGED: A reliable image URL
        url: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=600&q=80", 
        content: "Is this clean code?" 
      },
      { 
        title: "Funny video", 
        type: "video", 
        url: "https://www.w3schools.com/html/mov_bbb.mp4", 
        content: "Watch till the end!" 
      },
      { 
        title: "Discussion about Hooks", 
        type: "none", 
        url: "", 
        content: "useEffect is tricky sometimes." 
      },
    ];

// ... rest of the file remains exactly the same ...
    for (const comm of savedCommunities) {
      for (const config of postConfigs) {
        const randomUser = savedUsers[Math.floor(Math.random() * savedUsers.length)];
        
        const post = new Post({
          title: `[${comm.name}] ${config.title}`,
          content: config.content,
          mediaUrl: config.url, // Storing URL string, not file
          mediaType: config.type,
          userID: randomUser._id,
          communityID: comm._id,
          upvotes: [savedUsers[0]._id, savedUsers[1]._id], // 2 fake upvotes
          downvotes: [],
          
          // Let's give this post an award!
          awardsReceived: [{
            awardName: "Gold",
            givenBy: savedUsers[0]._id,
            givenAt: new Date()
          }]
        });

        const savedPost = await post.save();
        savedPosts.push(savedPost);
      }
    }
    console.log(`✅ ${savedPosts.length} posts created.`);

    // 6. Create Comments
    console.log('💬 Creating Comments...');
    
    for (const post of savedPosts) {
      // Comment 1: Text only
      await Comment.create({
        content: "Great post!",
        mediaType: "none",
        postID: post._id,
        userID: savedUsers[0]._id,
        upvotes: [],
        awardsReceived: []
      });

      // Comment 2: With an Image (Reaction GIF style)
      const mediaComment = await Comment.create({
        content: "My reaction to this:",
        mediaUrl: "https://placehold.co/100x100/orange/white?text=Reaction",
        mediaType: "image",
        postID: post._id,
        userID: savedUsers[1]._id,
        upvotes: [savedUsers[2]._id],
        awardsReceived: [{
           awardName: "Rocket",
           givenBy: savedUsers[0]._id
        }]
      });
      
      // Link comment back to post
      await Post.findByIdAndUpdate(post._id, { $push: { comments: mediaComment._id }});
    }

    console.log('✅ Comments created.');
    console.log('🏁 SEEDING COMPLETE! Database is ready for React.');
    process.exit();

  } catch (err) {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  }
};

// seedData();
