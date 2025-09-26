import CardProduct from "./CardProduct"
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Home from "../views/Home.jsx";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import GaleriaProductos from "../views/GaleriaProductos.jsx";
import CrearProducto from "../views/CrearProducto.jsx";




const AppRoutes = () => {
  
  return (
    <BrowserRouter>
      {/*<Header />*/}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/galeria" element={<GaleriaProductos />} />
        <Route path="/producto/:id" element={<CardProduct />} />
        <Route path="/crear-producto" element={<CrearProducto />} />
      </Routes>

      {/*<Footer />*/}
    </BrowserRouter>
  );
}

export default AppRoutes;
