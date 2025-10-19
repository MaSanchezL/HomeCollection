import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import { Row, Col } from "react-bootstrap";

const DetalleMisPedidos = () => {
  const { user } = useContext(UserContext);
  const { id } = useParams(); // id en el orders.model es orderId

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handlePedidos = () => {
    navigate("/pedidos");
  };

  useEffect(() => {
    const fetchDetailById = async () => {
      if (!user || !user.token) {
        setError("Usuario no autenticado. Por favor, inicie sesión.");
        setLoading(false);
        return;
      }
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/orders/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(
            `Error ${res.status}: ${
              errorText || "No se pudo cargar el detalle."
            }`
          );
        }
        const data = await res.json();
        setItems(data);
      } catch (err) {
        console.error("Error fetching order details:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDetailById();
  }, [id, user]);

  if (loading) {
    return (
      <Container className="my-5 text-center">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Cargando Detalle del pedido...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-5">
        <Alert variant="danger">
          <Alert.Heading>Error al cargar Detalle</Alert.Heading>
          <p>{error}</p>
          {/* Se usa navigate para un mejor manejo que window.location.reload() */}
          <Button onClick={handlePedidos} variant="danger">
            Volver a Pedidos
          </Button>
        </Alert>
      </Container>
    );
  }
  if (items.length === 0) {
    return (
      <Container className="my-5 text-center">
        <h2>Detalle del Pedido #{id}</h2>
        <Alert variant="info" className="mt-4">
          No se encontraron ítems para este pedido.
        </Alert>
        <Button onClick={handlePedidos} variant="primary" className="mt-3">
          Volver a Mis Pedidos
        </Button>
      </Container>
    );
  }
  return (
    <Container className="my-5">
<<<<<<< HEAD
      <h1 className="mb-4 text-center">Detalle del Pedido #{id}</h1>
      <div className="login-card">
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Nombre Producto</th>
              <th>Cantidad</th>
              <th>Precio Unitario</th>
              <th>Subtotal</th>
=======
      <h1 className="mb-4 text-center">Mi Historial de Pedidos</h1>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID Producto</th>
            <th>Nombre Producto</th>
            <th>Cantidad</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.order_id}>
              <td>#{order.id.toString().slice(0, 8)}</td>
              {}
              <td>{order.products.nombre}</td>
              <td className="fw-bold">${Number(order.quantity).toFixed(2)}</td>
              <td className="fw-bold">${Number(order.precio).toFixed(2)}</td>
              <td>
                <Button
                  variant="outline-info"
                  size="sm"
                  as={Link}
                  to={`/orders/${id}`}
                >
                  Ver Detalle
                </Button>
              </td>
>>>>>>> d527ca8b2b11a834926c5b2a7dc3a0f505451a3f
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>
                  <img
                    src={item.image_url}
                    alt={item.product_name}
                    style={{ width: 50, height: 50, objectFit: "cover" }}
                  />
                </td>{" "}
                <td>{item.product_name}</td>
                <td>{item.quantity}</td>
                {/* Se asume que item.price es el precio unitario */}
                <td>${Number(item.price).toFixed(0)}</td>
                <td className="fw-bold">
                  ${(Number(item.quantity) * Number(item.price)).toFixed(0)}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* ⚠️ Se corrige el mapeo de datos y se elimina el botón de 'Ver Detalle' redundante */}

        <div className="d-flex justify-content-end mt-4">
          {/* Aquí podrías agregar un Total General si fuera necesario */}
        </div>
        <Col xs={4}>
          <Button
            type="button"
            className="pedidos-button"
            onClick={handlePedidos}
          >
            Volver a Mis Pedidos
          </Button>
        </Col>
      </div>
    </Container>
  );
};

export default DetalleMisPedidos;
