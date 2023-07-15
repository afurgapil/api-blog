import { Box, Flex, Heading, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import Signout from "./SignOut";
import { UserContext } from "../context/UserContext";
import { useContext, useState, useEffect } from "react";
import ProfileName from "./ProfileName";

const Header = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      const isAdmin = user.isAdmin;
      if (isAdmin) {
        setIsAuth(true);
      }
    }
    setLoading(false);
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  } else {
    return (
      <Box bg="blue.500" py={4} minW="100%">
        <Flex
          alignItems="center"
          justifyContent="space-between"
          px={4}
          maxW="1200px"
          mx="auto"
        >
          <Heading as="h1" size="lg" color="white">
            Api Blog
          </Heading>
          <Flex alignItems="center">
            <Link as={RouterLink} to="/" color="white" mr={4}>
              Articles
            </Link>
            {isAuth && (
              <Link as={RouterLink} to="/panel" color="white" mr={4}>
                Panel
              </Link>
            )}
            {user ? (
              <Flex alignItems="center" ml={4}>
                <Link as={RouterLink} to="/favorites" color="white" mr={4}>
                  Favorites
                </Link>
                <ProfileName />
                <Signout />
              </Flex>
            ) : (
              <Flex>
                <Link as={RouterLink} to="/signup" color="white" mr={4}>
                  Sign Up
                </Link>
                <Link as={RouterLink} to="/signin" color="white">
                  Sign In
                </Link>
              </Flex>
            )}
          </Flex>
        </Flex>
      </Box>
    );
  }
};

export default Header;
