import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../views/Home";
import Login from "../views/Login";
import Register from "../views/Register";
import Profile from "../views/Profile";
import GaleriaProductos from "../views/GaleriaProductos";
import CardProduct from "../components/CardProduct";
import CrearProducto from "../views/CrearProducto.jsx";
import NotFound from "../views/NotFound";
import Cart from "../views/Cart.jsx";
import CheckoutSuccess from "../views/CheckoutSuccess.jsx";
import MisPedidos from "../views/MisPedidos.jsx";
import React, { useContext, useState, useEffect } from "react";


const RouterManager = () => {
  const { user, loading } = useContext(UserContext);

  if (loading) return <p>Cargando...</p>;

  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route
        path="/login"
        element={user ? <Navigate to="/profile" replace /> : <Login />}
      />
      <Route
        path="/register"
        element={user ? <Navigate to="/profile" replace /> : <Register />}
      />
      <Route path="/galeria" element={<GaleriaProductos />} />
      <Route path="/producto/:id" element={<CardProduct />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout-success" element={<CheckoutSuccess />} />

      {/* Rutas protegidas */}
      <Route
        path="/profile"
        element={user ? <Profile /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/crear-producto"
        element={user ? <CrearProducto /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/pedidos"
        element={user ? <MisPedidos /> : <Navigate to="/login" replace />}
      />

      {/* Ruta por defecto */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default RouterManager;
