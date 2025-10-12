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

  /*
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    fetch(`${API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Token inválido o sesión expirada");
        return res.json();
      })
      .then((data) => setUser({ ...data, token }))
      .catch(() => logout())
      .finally(() => setLoading(false));
  }, []);
  */

  /*
  const login = async (email, password) => {
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok)
        return { success: false, message: data.message || "Error de login" };

      localStorage.setItem("token", data.token);

      setUser(data);

      return { success: true };
    } catch (err) {
      console.error(err);
      return { success: false, message: "Error de conexión" };
    }
  };


  */
  return (
    <UserContext.Provider value={{ user, setUser, /*login,*/ logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};
