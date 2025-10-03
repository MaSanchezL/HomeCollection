import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";

// Necesitas agregar esta función a tu CartContext.jsx (ver sección 3)
// const { clearCart } = useContext(CartContext);

const CheckoutSuccess = () => {
  // Usamos totalPrice y totalProducts para mostrar el resumen
  const { cart, totalPrice, totalProducts, clearCart } =
    useContext(CartContext);

  // Utilizamos useEffect para vaciar el carrito al cargar la página
  /*   useEffect(() => {
    // Solo vaciamos el carrito si tiene algo
    if (cart.length > 0) {
      clearCart();
    }
  }, []);  */ // El array vacío asegura que se ejecute solo una vez al montar

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
            Tu número de pedido es:
            <strong>#{Math.floor(Math.random() * 900000) + 100000}</strong>
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
            <Button as={Link} to="/galeria" variant="primary" size="lg">
              Seguir Comprando
            </Button>
            <Button
              as={Link}
              to="/"
              variant="outline-secondary"
              onClick={clearCart}
            >
              Volver al Inicio
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CheckoutSuccess;
