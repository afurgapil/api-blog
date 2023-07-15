import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";

const AddBlogForm = () => {
  const [title, setTitle] = useState("");
  const [article, setArticle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/addBlog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, article }),
      });

      setTitle("");
      setArticle("");
    } catch (error) {
      console.error("Failed to save Article:", error);
    }
  };

  return (
    <Box
      as="form"
      onSubmit={handleSubmit}
      p={6}
      bg="white"
      shadow="md"
      borderRadius="md"
    >
      <FormControl>
        <FormLabel>Title:</FormLabel>
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Article:</FormLabel>
        <Textarea
          value={article}
          onChange={(e) => setArticle(e.target.value)}
          rows={6}
        />
      </FormControl>
      <Button type="submit" mt={6} colorScheme="blue" size="lg">
        Submit
      </Button>
    </Box>
  );
};

export default AddBlogForm;
