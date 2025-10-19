import React, { useContext, useEffect } from "react";
import { Navigate, Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import { UserContext } from "../context/UserContext";

const CheckoutSuccess = () => {
  const { cart, totalPrice, totalProducts, clearCart, orderId } =
    useContext(CartContext);
  const { user, logout } = useContext(UserContext);

  const handleLogout = () => {
    logout();
    clearCart();
  };
  return (
    <Container className="my-5 d-flex justify-content-center">
      <Card style={{ maxWidth: "600px", width: "100%" }} className="shadow-lg">
        <Card.Header
          as="h2"
          className="text-center text-white p-3"
          style={{ backgroundColor: "var(--principal)" }}
        >
          ¡Tu Compra se ha Realizado con Éxito!
        </Card.Header>
        <Card.Body className="text-center">
          <h3 className="text-success mb-4">
            <i className="bi bi-check-circle-fill me-2"></i>
            Muchas Gracias!
          </h3>
          <p className="lead">
            Tu número de orden es: 
            <span className="fw-bold">{orderId}</span>
          </p>

          <hr />

          <Card.Title className="mt-4 mb-3">Resumen del Pedido</Card.Title>
          <ListGroup variant="flush">
            <ListGroup.Item className="d-flex justify-content-between">
              Cantidad de Productos Comprados:
              <span className="fw-bold">{totalProducts}</span>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between fs-5">
              VALOR TOTAL PAGADO:
              <span className="fw-bold text-success">
                ${totalPrice.toFixed(0)}
              </span>
            </ListGroup.Item>
          </ListGroup>

          <div className="mt-5 d-grid gap-3">
            <Button
              as={Link}
              to="/galeria"
              className="pedidos-button"
              size="lg"
            >
              Continuar Comprando
            </Button>
            <Button
              as={Link}
              to="/"
              className="logout-button"
              onClick={handleLogout}
            >
              Cerrar Sesión
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CheckoutSuccess;
