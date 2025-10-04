import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/css/index.css";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import CartProvider from "./context/CartContext.jsx";
import { UserProvider } from "./context/UserContext.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
);
