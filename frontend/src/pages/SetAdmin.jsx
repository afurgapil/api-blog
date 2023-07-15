import { useState, useEffect } from "react";
import { Box, Button, Heading, Text } from "@chakra-ui/react";

const SetAdmin = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/users");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleAdminButtonClick = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/users/${userId}/admin`,
        {
          method: "PUT",
        }
      );

      if (response.ok) {
        console.log("User's isAdmin property updated successfully.");
      } else {
        console.error("Failed to set admin role.");
      }
    } catch (error) {
      console.error("Error setting admin role:", error);
    }
  };

  return (
    <Box minH="100vh">
      <Heading size="xl" mb={4}>
        Users
      </Heading>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            <Text>Username: {user.username}</Text>
            <Text>Email: {user.email}</Text>
            <Button
              colorScheme="blue"
              size="sm"
              mt={2}
              onClick={() => handleAdminButtonClick(user._id)}
            >
              Set Admin
            </Button>
          </li>
        ))}
      </ul>
    </Box>
  );
};

export default SetAdmin;
