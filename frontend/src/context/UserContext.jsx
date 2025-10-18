import { createContext, useState, useEffect, use } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (!user) {
      setLoading(false);
      return;
    }
    const jsonUser = JSON.parse(user);

    fetch(`${API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${jsonUser.token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Token inválido o sesión expirada");
        return res.json();
      })
      .then((data) => setUser({ ...data, token: jsonUser.token }))
      .catch(() => logout())
      .finally(() => setLoading(false));
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser, /*login,*/ logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};
