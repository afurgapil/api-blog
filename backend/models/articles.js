const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  title: String,
  article: String,
  likes: [String],
  dislikes: [String],
  favorites: [String],
});

module.exports = mongoose.model("Article", articleSchema);
