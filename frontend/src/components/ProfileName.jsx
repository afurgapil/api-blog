import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Heading } from "@chakra-ui/react";

const ProfileName = () => {
  const { user } = useContext(UserContext);
  const username = user.username;

  return (
    <div>
      <Heading as="h2" size="md" mr="4">
        {username}
      </Heading>
    </div>
  );
};

export default ProfileName;
