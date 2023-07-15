import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const { signin } = useContext(UserContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signin(username, password);
      navigate("/");
    } catch (error) {
      console.error("Failed to sign in.", error);
    }
  };

  return (
    <Box minH="90vh">
      <Heading size="xl" mb={4}>
        Sign In
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl mb={4}>
          <FormLabel htmlFor="username">Username:</FormLabel>
          <Input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel htmlFor="password">Password:</FormLabel>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Button type="submit" colorScheme="blue">
          Sign In
        </Button>
      </form>
    </Box>
  );
};

export default Signin;
