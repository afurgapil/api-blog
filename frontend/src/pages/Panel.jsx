import {
  Container,
  Heading,
  Flex,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Panel() {
  return (
    <Container maxW="lg">
      <Flex direction="column" align="center" justify="center" h="100vh">
        <LinkBox
          p={6}
          borderWidth={1}
          borderRadius="lg"
          boxShadow="lg"
          mb={4}
          w="100%"
          maxW="md"
          textAlign="center"
        >
          <Heading size="lg" mb={2}>
            Add Article
          </Heading>
          <LinkOverlay as={Link} to="/add-article" color="blue.500">
            GO
          </LinkOverlay>
        </LinkBox>
        <LinkBox
          p={6}
          borderWidth={1}
          borderRadius="lg"
          boxShadow="lg"
          mb={4}
          w="100%"
          maxW="md"
          textAlign="center"
        >
          <Heading size="lg" mb={2}>
            Manage Articles
          </Heading>
          <LinkOverlay as={Link} to="/manage-articles" color="blue.500">
            GO
          </LinkOverlay>
        </LinkBox>
        <LinkBox
          p={6}
          borderWidth={1}
          borderRadius="lg"
          boxShadow="lg"
          mb={4}
          w="100%"
          maxW="md"
          textAlign="center"
        >
          <Heading size="lg" mb={2}>
            Manage Admins
          </Heading>
          <LinkOverlay as={Link} to="/set-admin" color="blue.500">
            GO
          </LinkOverlay>
        </LinkBox>
      </Flex>
    </Container>
  );
}

export default Panel;
