import { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import UnAuthorized from "../components/UnAuthorized";

function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const { user } = useContext(UserContext);
  useEffect(() => {
    const isAdmin = user.isAdmin;
    if (isAdmin) {
      setIsAuth(true);
    }
    setLoading(false);
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (isAuth) {
    return children;
  } else {
    return <UnAuthorized></UnAuthorized>;
  }
}

export default ProtectedRoute;
