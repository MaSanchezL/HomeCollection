import { createContext, useState, useEffect } from "react";
import usuarios from "../../../backend/db/users.json";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const login = (email, password) => {
    const usuarioEncontrado = usuarios.find(
      (u) => u.email === email && u.password === password
    );
    if (usuarioEncontrado) {
      setUser(usuarioEncontrado);
      localStorage.setItem("user", JSON.stringify(usuarioEncontrado));
      return true;
    } else {
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
