import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Cart from "../views/Cart";
// import Profile from "../components/Profile";
// import Checkout from "../components/Checkout";
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

const RouterManager = () => {
  const token = true;

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/galeria" element={<GaleriaProductos />} />
          <Route path="/producto/:id" element={<CardProduct />} />
          <Route path="/crear-producto" element={<CrearProducto />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout-success" element={<CheckoutSuccess />} />
          <Route path="/pedidos" element={<MisPedidos />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default RouterManager;
