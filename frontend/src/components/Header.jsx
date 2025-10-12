import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../context/UserContext.jsx";
import { CartContext } from "../context/CartContext";
import logo1 from "../assets/logo1.png";
import "../assets/css/Header.css";

function Header() {
  const { user } = useContext(UserContext);
  const { totalProducts } = useContext(CartContext);

  useEffect(() => {
  //  console.log("Usuario en Header:", user);
  }, [user]);

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
        <Navbar.Brand as={Link} to="/home">
          <img src={logo1} alt="Logo" className="logo-hover" />
        </Navbar.Brand>
        <div className="header-title">HOME COLLECTION</div>
        <Nav className="d-flex align-items-center me-2">
          <Nav.Link as={Link} to={user ? "/profile" : "/login"}>
            <FontAwesomeIcon icon={faUser} size="2x" />
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/cart"
            style={{
              color: "white",
              backgroundColor: "red",
              borderRadius: "50%",
              padding: "0.2rem 0.5rem",
              marginLeft: "0.5rem",
            }}
          >
            🛒 {totalProducts > 0 ? totalProducts : ""}
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
