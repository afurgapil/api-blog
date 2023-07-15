/* eslint-disable no-undef */
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const Article = require("./models/articles");
const User = require("./models/users");

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

// Add like to an article
app.put("/api/articles/:id/like", async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  try {
    const updatedArticle = await Article.findByIdAndUpdate(
      id,
      { $addToSet: { likes: userId }, $pull: { dislikes: userId } },
      { new: true }
    );

    if (!updatedArticle) {
      return res.status(404).json({ error: "Article not found" });
    }

    res.json(updatedArticle);
  } catch (error) {
    console.error("Error adding like to article:", error);
    res.status(500).json({ error: "Error adding like to article" });
  }
});

// Add dislike to an article
app.put("/api/articles/:id/dislike", async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  try {
    const updatedArticle = await Article.findByIdAndUpdate(
      id,
      { $addToSet: { dislikes: userId }, $pull: { likes: userId } },
      { new: true }
    );

    if (!updatedArticle) {
      return res.status(404).json({ error: "Article not found" });
    }

    res.json(updatedArticle);
  } catch (error) {
    console.error("Error adding dislike to article:", error);
    res.status(500).json({ error: "Error adding dislike to article" });
  }
});

// Add to favorites endpoint
app.put("/api/articles/:articleId/favorite", async (req, res) => {
  const { articleId } = req.params;
  const { userId } = req.body;

  try {
    // Update the user's favorite articles
    await User.findByIdAndUpdate(userId, { $push: { favorites: articleId } });

    // Update the users who have favorited the article
    await Article.findByIdAndUpdate(articleId, {
      $push: { favorites: userId },
    });

    res.status(200).json({ message: "Article added to favorites." });
  } catch (error) {
    res.status(500).json({ error: "An error occurred." });
  }
});

// Remove from favorites endpoint
app.delete("/api/articles/:articleId/unfavorite", async (req, res) => {
  const { articleId } = req.params;
  const { userId } = req.body;

  try {
    // Remove the article from the user's favorites
    await User.findByIdAndUpdate(userId, { $pull: { favorites: articleId } });

    // Update the users who have favorited the article
    await Article.findByIdAndUpdate(articleId, {
      $pull: { favorites: userId },
    });

    res.status(200).json({ message: "Article removed from favorites." });
  } catch (error) {
    res.status(500).json({ error: "An error occurred." });
  }
});

// List favorites endpoint
app.get("/api/articles/favorites/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).populate("favorites");

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    res.status(200).json(user.favorites);
  } catch (error) {
    res.status(500).json({ error: "An error occurred." });
  }
});

// Get users
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Error getting users" });
  }
});

// Update user isAdmin property
app.put("/api/users/:id/admin", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.isAdmin = true;
    await user.save();

    res.json({ message: "User has been granted admin privileges" });
  } catch (error) {
    res.status(500).json({ error: "Error granting admin privileges to user" });
  }
});

// Signup
app.post("/api/signup", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.create({ username, email, password });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "Error saving user" });
  }
});

// Signin
app.post("/api/signin", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    // Check password
    if (user.password !== password) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // User logged in
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Error signing in" });
  }
});

// Articles
// Get all articles
app.get("/api/articles", async (req, res) => {
  try {
    const articles = await Article.find();
    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: "Error getting articles" });
  }
});

// Get a specific article
app.get("/api/articles/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const article = await Article.findById(id);
    if (!article) {
      return res.status(404).json({ error: "Article not found" });
    }
    res.json(article);
  } catch (error) {
    res.status(500).json({ error: "Error getting article" });
  }
});

// Create a new article
app.post("/api/addBlog", async (req, res) => {
  const { title, article } = req.body;

  try {
    const newArticle = new Article({
      title,
      article,
    });

    await newArticle.save();
    console.log("Article successfully saved:", newArticle);

    res.json(newArticle);
  } catch (err) {
    console.error("Error saving article:", err);
    res.status(500).json({ error: "Error saving article" });
  }
});

// Update an article
app.put("/api/articles/:id", async (req, res) => {
  const { id } = req.params;
  const { title, article } = req.body;
  try {
    const updatedArticle = await Article.findOneAndUpdate(
      { _id: id },
      { title, article },
      { new: true }
    );

    if (!updatedArticle) {
      return res.status(404).json({ error: "Article not found" });
    }

    console.log("Updated Article:", updatedArticle);
    res.json(updatedArticle);
  } catch (error) {
    console.error("Error updating article:", error);
    res.status(500).json({ error: "Error updating article" });
  }
});

// Delete an article
app.delete("/api/articles/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedArticle = await Article.findByIdAndDelete(id);
    if (!deletedArticle) {
      return res.status(404).json({ error: "Article not found" });
    }
    res.json({ message: "Article successfully deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting article" });
  }
});
mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    console.log("Connected to DB");
    app.listen(8080, () => {
      console.log("Server is running on port 8080");
    });
  })
  .catch((err) => {
    console.error("Failed to connect to DB:", err);
  });
