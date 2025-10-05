import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../context/UserContext.jsx";
import logo1 from "../assets/logo1.png";
import "../assets/css/Header.css";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import { useContext } from "react";

function Header() {
  const { user } = useContext(UserContext);
  const { totalProducts } = useContext(CartContext);

  const NavLinkItem = ({ to, children }) => (
    <Nav.Link as={Link} to={to} className="mx-2 fw-bold">
      {children}
    </Nav.Link>
  );
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
        <NavLinkItem to="/" className="ms-2">
          <img src={logo1} alt="Logo" className="logo-hover" />
        </NavLinkItem>

        <div className="header-title">HOME COLLECTION</div>

        <Nav className="d-flex align-items-center me-2">
          <NavLinkItem to={user ? "/profile" : "/login"} className="icon-hover">
            <FontAwesomeIcon icon={faUser} size="2x" className="icon-hover" />
          </NavLinkItem>

          <NavLinkItem to="/cart" className="icon-hover">
            <FontAwesomeIcon
              icon={faShoppingBag}
              size="2x"
              className="icon-hover"
            />
            {totalProducts}
          </NavLinkItem>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
