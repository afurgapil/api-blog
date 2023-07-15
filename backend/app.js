/* eslint-disable no-undef */
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Article = require("./models/articles");
const User = require("./models/users");

const app = express();
app.use(express.json());
app.use(cors());

// Bir yazıya like ekleme

app.put("/api/articles/:id/like", async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body; // Kullanıcının kimliği

  try {
    const updatedArticle = await Article.findByIdAndUpdate(
      id,
      { $addToSet: { likes: userId }, $pull: { dislikes: userId } },
      { new: true }
    );

    if (!updatedArticle) {
      return res.status(404).json({ error: "Yazı bulunamadı" });
    }

    res.json(updatedArticle);
  } catch (error) {
    console.error("Yazı beğenme hatası:", error);
    res.status(500).json({ error: "Yazı beğenme hatası" });
  }
});

// Bir yazıya dislike ekleme
app.put("/api/articles/:id/dislike", async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body; // Kullanıcının kimliği

  try {
    const updatedArticle = await Article.findByIdAndUpdate(
      id,
      { $addToSet: { dislikes: userId }, $pull: { likes: userId } },
      { new: true }
    );

    if (!updatedArticle) {
      return res.status(404).json({ error: "Yazı bulunamadı" });
    }

    res.json(updatedArticle);
  } catch (error) {
    console.error("Yazı beğenmeme hatası:", error);
    res.status(500).json({ error: "Yazı beğenmeme hatası" });
  }
});

// Favoriye ekleme endpoint'i
app.put("/api/articles/:articleId/favorite", async (req, res) => {
  const { articleId } = req.params;
  const { userId } = req.body;

  try {
    // Kullanıcının favorilere eklediği makaleleri güncelle
    await User.findByIdAndUpdate(userId, { $push: { favorites: articleId } });

    // Makalenin favorilendiği kullanıcıları güncelle
    await Article.findByIdAndUpdate(articleId, {
      $push: { favorites: userId },
    });

    res.status(200).json({ message: "Makale favorilere eklendi." });
  } catch (error) {
    res.status(500).json({ error: "Bir hata oluştu." });
  }
});

// Favoriden çıkarma endpoint'i
app.delete("/api/articles/:articleId/unfavorite", async (req, res) => {
  const { articleId } = req.params;
  const { userId } = req.body;

  try {
    // Kullanıcının favorilerinden makaleyi kaldır
    await User.findByIdAndUpdate(userId, { $pull: { favorites: articleId } });

    // Makalenin favorilendiği kullanıcıları güncelle
    await Article.findByIdAndUpdate(articleId, {
      $pull: { favorites: userId },
    });

    res.status(200).json({ message: "Makale favorilerden çıkarıldı." });
  } catch (error) {
    res.status(500).json({ error: "Bir hata oluştu." });
  }
});
// Favorileri listeleme endpoint'i
app.get("/api/articles/favorites/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).populate("favorites");

    if (!user) {
      return res.status(404).json({ error: "Kullanıcı bulunamadı." });
    }

    res.status(200).json(user.favorites);
  } catch (error) {
    res.status(500).json({ error: "Bir hata oluştu." });
  }
});

// Kullanıcıları getirme
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Kullanıcıları getirme hatası" });
  }
});

// Kullanıcının isAdmin özelliğini güncelleme
app.put("/api/users/:id/admin", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "Kullanıcı bulunamadı" });
    }

    user.isAdmin = true;
    await user.save();

    res.json({ message: "Kullanıcı admin yetkisi verildi" });
  } catch (error) {
    res.status(500).json({ error: "Kullanıcı admin yetkisi verme hatası" });
  }
});
//signup
app.post("/api/signup", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.create({ username, email, password });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "Kullanıcı kaydetme hatası" });
  }
});
//signin
app.post("/api/signin", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "Kullanıcı bulunamadı" });
    }

    // Parolayı kontrol et
    if (user.password !== password) {
      return res.status(401).json({ error: "Geçersiz parola" });
    }

    // Kullanıcı oturum açtı
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Oturum açma hatası" });
  }
});

//yazılar
// Tüm yazıları getirme
app.get("/api/articles", async (req, res) => {
  try {
    const articles = await Article.find();
    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: "Yazıları getirme hatası" });
  }
});

// Belirli bir yazıyı getirme
app.get("/api/articles/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const article = await Article.findById(id);
    if (!article) {
      return res.status(404).json({ error: "Yazı bulunamadı" });
    }
    res.json(article);
  } catch (error) {
    res.status(500).json({ error: "Yazı getirme hatası" });
  }
});

// Yeni bir yazı oluşturma
app.post("/api/addBlog", async (req, res) => {
  const { title, article } = req.body;

  try {
    const newArticle = new Article({
      title,
      article,
    });

    await newArticle.save();
    console.log("Makale başarıyla kaydedildi:", newArticle);

    res.json(newArticle);
  } catch (err) {
    console.error("Makale kaydetme hatası:", err);
    res.status(500).json({ error: "Makale kaydetme hatası" });
  }
});

// Bir yazıyı güncelleme
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
      return res.status(404).json({ error: "Yazı bulunamadı" });
    }

    console.log("Güncellenen Yazı:", updatedArticle);
    res.json(updatedArticle);
  } catch (error) {
    console.error("Yazı güncelleme hatası:", error);
    res.status(500).json({ error: "Yazı güncelleme hatası" });
  }
});

// Bir yazıyı silme
app.delete("/api/articles/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedArticle = await Article.findByIdAndDelete(id);
    if (!deletedArticle) {
      return res.status(404).json({ error: "Yazı bulunamadı" });
    }
    res.json({ message: "Yazı başarıyla silindi" });
  } catch (error) {
    res.status(500).json({ error: "Yazı silme hatası" });
  }
});

mongoose
  .connect(
    "mongodb+srv://gafur:12345@blog.qdvhefi.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to DB");
    app.listen(8080, () => {
      console.log("Server is running on port 8080");
    });
  })
  .catch((err) => {
    console.error("Failed to connect to DB:", err);
  });
