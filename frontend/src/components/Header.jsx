import { useState, useContext, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../context/UserContext.jsx";
import logo1 from "../assets/logo1.png";
import "../assets/css/Header.css";
import { CartContext } from "../context/CartContext";

function Header() {
  const [cartItems, setCartItems] = useState(0);
  const { user } = useContext(UserContext);

  const { cart, totalProducts, total, totalPrice } = useContext(CartContext);
  useEffect(() => {
    console.log("ver lo que cart en el contexto", cart);
  }, [cart]);
  return (
    <Navbar
      style={{ backgroundColor: "var(--principal)" }}
      variant="dark"
      sticky="top"
    >
      <Container
        fluid
        className="d-flex align-items-center justify-content-between px-0"
      >
        <Navbar.Brand href="/home" className="ms-2">
          <img src={logo1} alt="Logo" className="logo-hover" />
        </Navbar.Brand>

        <div className="header-title">HOME COLLECTION</div>

        <Nav className="d-flex align-items-center me-2">
          <Nav.Link href={user ? "/profile" : "/login"} className="icon-hover">
            <FontAwesomeIcon icon={faUser} size="2x" className="icon-hover" />
          </Nav.Link>
          <div
            style={{
              color: "white",
              backgroundColor: "red",
            }}
          >
            <Nav.Link href="/cart" className="icon-hover">
              🛒
              {totalProducts > 0 ? totalProducts : ""}
            </Nav.Link>
          </div>
          <Nav.Link href="/cart" className="icon-hover">
            <FontAwesomeIcon
              icon={faShoppingBag}
              size="2x"
              className="icon-hover"
            />
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
