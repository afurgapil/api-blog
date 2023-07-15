import { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Box, Button, Center, Heading, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const Favorites = () => {
  const { user } = useContext(UserContext);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/articles/favorites/${user?._id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch favorites.");
      }

      const favoritesData = await response.json();
      const favoritesWithTitles = [];

      for (let index = 0; index < favoritesData.length; index++) {
        const favorite = favoritesData[index];
        const articleResponse = await fetch(
          `http://localhost:8080/api/articles/${favorite._id}`
        );

        if (!articleResponse.ok) {
          throw new Error("Failed to fetch article.");
        }

        const articleData = await articleResponse.json();
        favoritesWithTitles.push({ ...favorite, title: articleData.title });
      }

      setFavorites(favoritesWithTitles);
    } catch (error) {
      console.error(error);
      // Perform necessary actions in case of an error
    }
  };

  const handleUnfavorite = async (articleId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/articles/${articleId}/unfavorite`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: user._id }),
        }
      );

      if (response.ok) {
        fetchFavorites();
        console.log("Successfully removed from favorites.");
      } else {
        console.error("Failed to remove from favorites.");
      }
    } catch (error) {
      console.error("Error removing from favorites:", error);
    }
  };

  if (favorites.length === 0) {
    return (
      <Box minH="80vh">
        <Heading textAlign="center">No favorites yet.</Heading>
      </Box>
    );
  }

  return (
    <Box minH="100vh">
      <Heading p="4" borderBottom="1px" w="full">
        My Favorites
      </Heading>
      <Box m={4}>
        {favorites.map((article) => (
          <Box
            key={article._id}
            bg="white"
            p={4}
            shadow="md"
            borderRadius="md"
            mb={4}
          >
            <Heading as="h2" size="md" mb={2}>
              {article.title}
            </Heading>
            <Text mb={2} noOfLines={3}>
              {article.article}
            </Text>
            <Button
              as={RouterLink}
              to={`/articles/${article._id}`}
              colorScheme="blue"
              size="sm"
              mr={2}
            >
              View Full Article
            </Button>
            <Button
              colorScheme="red"
              size="sm"
              onClick={() => handleUnfavorite(article._id)}
            >
              Remove from Favorites
            </Button>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Favorites;
