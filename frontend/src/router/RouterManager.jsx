import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
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
import { UserContext } from "../context/UserContext.jsx";
import { useContext } from "react";

const RouterManager = () => {
  const { user } = useContext(UserContext);

  const token = true;

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/profile"
          element={user ? <Profile /> : <Navigate to="/login" />}
        />
        <Route path="/galeria" element={<GaleriaProductos />} />
        <Route path="/producto/:id" element={<CardProduct />} />
        <Route path="/crear-producto" element={<CrearProducto />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout-success" element={<CheckoutSuccess />} />
        <Route path="/pedidos" element={<MisPedidos />} />
      </Routes>
    </>
  );
};

export default RouterManager;
