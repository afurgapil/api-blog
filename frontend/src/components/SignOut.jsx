import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";

const Signout = () => {
  const navigate = useNavigate();
  const { signout } = useContext(UserContext);

  const handleSignout = () => {
    signout();
    navigate("/");
  };

  return (
    <Button colorScheme="red" onClick={handleSignout}>
      Sign Out
    </Button>
  );
};

export default Signout;
