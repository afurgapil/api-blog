import { Box, Heading, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const UnAuthorized = () => {
  return (
    <Box p={4}>
      <Heading as="h2" size="lg" mb={4}>
        Access Denied
      </Heading>
      <Text>
        You don't have permission to access this page. Please sign in with an
        authorized account or contact an administrator.
      </Text>
      <Text mt={4}>
        To return to the homepage, click
        <RouterLink to="/" color="blue.500">
          here
        </RouterLink>
        .
      </Text>
    </Box>
  );
};

export default UnAuthorized;
