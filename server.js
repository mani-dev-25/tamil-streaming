const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Video Schema
const videoSchema = new mongoose.Schema({
title: String,
url: String
});

const Video = mongoose.model("Video", videoSchema);

// API Route to get videos
app.get("/api/videos", async (req, res) => {
const videos = await Video.find();
res.json(videos);
});

// Start Server
app.listen(process.env.PORT || 5000, () => {
console.log("Server running on port " + process.env.PORT);
});
