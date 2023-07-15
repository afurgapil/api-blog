import { createContext, useState, useEffect } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const signin = async (username, password) => {
    try {
      const response = await fetch("http://localhost:8080/api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
      } else {
        console.error("Failed to sign in.");
      }
    } catch (error) {
      console.error("Failed to sign in.", error);
    }
  };

  const signout = () => {
    setUser(null);
    localStorage.removeItem("user");
    console.log("Kullanıcı oturumunu kapattı");
  };

  return (
    <UserContext.Provider value={{ user, signin, signout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
