import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        console.log("User registration successful.");
        navigate("/signin");
      } else {
        console.error("Failed to register user.");
      }
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <Box minH="90vh">
      <Heading size="xl" mb={4}>
        Sign Up
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
          <FormLabel htmlFor="email">Email:</FormLabel>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          Sign Up
        </Button>
      </form>
    </Box>
  );
};

export default Signup;
