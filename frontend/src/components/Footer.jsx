import { Box, Flex, Link, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box bg="gray.200" py={4} px={6}>
      <Flex justifyContent="center" alignItems="center">
        <Text>&copy; 2023 ApiBlog.</Text>
        <Link
          href="https://github.com/afurgapil"
          target="_blank"
          rel="noopener noreferrer"
          color="gray.600"
          mr={4}
        >
          Gapil
        </Link>
      </Flex>
    </Box>
  );
};

export default Footer;
