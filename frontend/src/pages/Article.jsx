import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { UserContext } from "../context/UserContext";

const Article = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [userID, setUserID] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    fetchArticle();
  }, [user]);
  useEffect(() => {
    if (user) {
      setUserID(user._id);
    }
  }, [user]);

  const fetchArticle = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/articles/${id}`);
      const data = await response.json();
      setArticle(data);
      setIsLiked(data.likes.includes(user?._id));
      setIsDisliked(data.dislikes.includes(user?._id));
      setIsFavorited(data.favorites.includes(user?._id));
    } catch (error) {
      console.error("Error fetching article:", error);
    }
  };

  const handleLike = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/articles/${id}/like`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: userID }),
        }
      );
      if (response.ok) {
        setIsLiked(true);
        setIsDisliked(false);
      } else {
        console.error("Failed to like the article.");
      }
    } catch (error) {
      console.error("Error liking the article:", error);
    }
  };

  const handleDislike = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/articles/${id}/dislike`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: userID }),
        }
      );
      if (response.ok) {
        setIsLiked(false);
        setIsDisliked(true);
      } else {
        console.error("Failed to dislike the article.");
      }
    } catch (error) {
      console.error("Error disliking the article:", error);
    }
  };

  const handleFavorite = async () => {
    if (!user) {
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:8080/api/articles/${id}/favorite`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: userID }),
        }
      );

      if (response.ok) {
        setIsFavorited(true);
        console.log("Successfully favorited the article");
      } else {
        console.error("Failed to favorite the article");
      }
    } catch (error) {
      console.error("Error favoriting the article:", error);
    }
  };

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <Box p={10} position="relative" minH="100vh">
      <Heading mb={4}>{article.title}</Heading>
      <Text mb={4}>{article.article}</Text>
      <Box position="absolute" top="1rem" right="1rem">
        <Button
          colorScheme="blue"
          onClick={handleLike}
          disabled={isLiked}
          mr={2}
        >
          {isLiked ? "Liked" : "Like"}
        </Button>
        <Button
          colorScheme="red"
          onClick={handleDislike}
          disabled={isDisliked}
          mr={2}
        >
          {isDisliked ? "Disliked" : "Dislike"}
        </Button>
        <Button
          colorScheme={isFavorited ? "orange" : "gray"}
          onClick={handleFavorite}
          disabled={isFavorited}
        >
          {isFavorited ? "Favorited" : "Add to Favorites"}
        </Button>
      </Box>
    </Box>
  );
};

export default Article;
