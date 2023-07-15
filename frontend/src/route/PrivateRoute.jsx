import { useEffect, useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function PrivateRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const { user } = useContext(UserContext);
  useEffect(() => {
    if (user) {
      setIsAuth(true);

      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (isAuth) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
}

export default PrivateRoute;
