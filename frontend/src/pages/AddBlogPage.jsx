import { Box, Heading } from "@chakra-ui/react";
import AddBlogForm from "../components/AddBlogFrom";

const AddBlogPage = () => {
  return (
    <Box p={4} minH="90vh">
      <Box bg="white" p={6} borderRadius="md" shadow="md">
        <AddBlogForm />
      </Box>
    </Box>
  );
};

export default AddBlogPage;
