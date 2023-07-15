import { Heading, Box, Text, Button, VStack, Flex } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { GrLike, GrDislike, GrFavorite } from "react-icons/gr";

const Articles = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/articles");
      const data = await response.json();
      setArticles(data);
    } catch (error) {
      console.error("Yazıları getirme hatası:", error);
    }
  };

  return (
    <Box p={4} minH="100vh">
      <VStack spacing={4} align="start">
        <Heading size="lg" borderBottom="1px" w="full">
          Articles
        </Heading>
        {articles.map((article) => (
          <Box
            key={article._id}
            bg="white"
            p={4}
            shadow="md"
            borderRadius="md"
            w="100%"
          >
            <Heading as="h2" size="md" mb={2}>
              {article.title}
            </Heading>
            <Text mb={2} noOfLines={2}>
              {article.article}
            </Text>
            <Flex justifyContent="space-between" alignItems="center">
              <Button
                as={RouterLink}
                to={`/articles/${article._id}`}
                colorScheme="blue"
                size="sm"
              >
                Read
              </Button>
              <Flex alignItems="center">
                <Flex alignItems="center" mr={2}>
                  <GrLike size={18} />
                  <Text ml={1}>{article.likes.length}</Text>
                </Flex>
                <Flex alignItems="center" mr={2}>
                  <GrDislike size={18} />
                  <Text ml={1}>{article.dislikes.length}</Text>
                </Flex>
                <Flex alignItems="center">
                  <GrFavorite size={18} />
                  <Text ml={1}>{article.favorites.length}</Text>
                </Flex>
              </Flex>
            </Flex>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default Articles;
