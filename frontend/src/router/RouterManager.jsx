import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Cart from "../views/Cart";
// import Profile from "../components/Profile";
// import Checkout from "../components/Checkout";
import Home from "../views/Home";
import Login from "../views/Login";
// import CardProduct from "../components/CardProduct";
// import Pedidos from "../views/Pedidos";
// import { CardHome } from "../components/CardHome";

const RouterManager = () => {
  const token = true;

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/profile" element={<Profile />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/cart" element={<CardHome />} />
          <Route path="/pedidos" element={<Pedidos />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default RouterManager;