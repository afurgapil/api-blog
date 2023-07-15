import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Heading,
  Text,
  Textarea,
  Collapse,
} from "@chakra-ui/react";

const ManageArticles = () => {
  const [articles, setArticles] = useState([]);
  const [editingArticleId, setEditingArticleId] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedArticle, setUpdatedArticle] = useState("");

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/articles");
      const data = await response.json();
      setArticles(data);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  const handleEditClick = (id) => {
    setEditingArticleId(id);
    const articleToEdit = articles.find((article) => article._id === id);
    setUpdatedTitle(articleToEdit.title);
    setUpdatedArticle(articleToEdit.article);
  };

  const handleDeleteClick = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/articles/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      console.log(data.message);
      fetchArticles();
    } catch (error) {
      console.error("Error deleting article:", error);
    }
  };

  const handleSaveClick = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/articles/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: updatedTitle,
          article: updatedArticle,
        }),
      });
      const data = await response.json();
      console.log("Updated Article:", data);
      setEditingArticleId(null);
      fetchArticles();
    } catch (error) {
      console.error("Error updating article:", error);
    }
  };

  return (
    <Box minH="100vh" p="5">
      <Heading size="xl" w="full" borderBottom="1px">
        Manage Articles
      </Heading>
      <ul>
        {articles.map((article) => (
          <li key={article._id}>
            {editingArticleId === article._id ? (
              <>
                <Textarea
                  value={updatedTitle}
                  onChange={(e) => setUpdatedTitle(e.target.value)}
                />
                <Textarea
                  value={updatedArticle}
                  onChange={(e) => setUpdatedArticle(e.target.value)}
                />
                <Button
                  colorScheme="blue"
                  size="sm"
                  onClick={() => handleSaveClick(article._id)}
                >
                  Save
                </Button>
                <Button
                  colorScheme="red"
                  size="sm"
                  onClick={() => setEditingArticleId(null)}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <Heading as="h2" size="lg" mb={2} mt="30px">
                  {article.title}
                </Heading>
                <Collapse startingHeight={40}>
                  <Text mb="10">{article.article}</Text>
                </Collapse>
                <Button
                  colorScheme="blue"
                  size="sm"
                  onClick={() => handleEditClick(article._id)}
                  mt="20px"
                >
                  Edit
                </Button>
                <Button
                  colorScheme="red"
                  size="sm"
                  onClick={() => handleDeleteClick(article._id)}
                  mt="20px"
                >
                  Delete
                </Button>
              </>
            )}
          </li>
        ))}
      </ul>
    </Box>
  );
};

export default ManageArticles;
