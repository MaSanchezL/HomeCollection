import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";

const MisPedidos = () => {
  const { user } = useContext(UserContext);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handlePerfil = () => {
    navigate("/profile");
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/orders/me`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        });

        if (!res.ok) throw new Error("Error al obtener pedidos");

        const data = await res.json();
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <Container className="my-5 text-center">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Cargando historial de pedidos...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-5">
        <Alert variant="danger">
          <Alert.Heading>Error al cargar el historial</Alert.Heading>
          <p>{error}</p>
          <Button onClick={() => window.location.reload()} variant="danger">
            Reintentar
          </Button>
        </Alert>
      </Container>
    );
  }

  if (orders.length === 0) {
    return (
      <Container className="my-5 text-center">
        <h2>Historial de Pedidos</h2>
        <Alert variant="info" className="mt-4">
          Aún no has realizado ningún pedido.
        </Alert>
        <Button as={Link} to="/galeria" variant="primary" className="mt-3">
          Empezar a Comprar
        </Button>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <h1 className="mb-4 text-center">Mi Historial de Pedidos</h1>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID Pedido</th>
            <th>Fecha</th>
            <th>Monto Total</th>
            <th>Detalle</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>#{order.id.toString().slice(0, 8)}</td>
              <td>{new Date(order.created_at).toLocaleDateString()}</td>
              <td className="fw-bold">
                ${Number(order.total_amount).toFixed(2)}
              </td>
              <td>
                <Button
                  variant="outline-info"
                  size="sm"
                  as={Link}
                  to={`/orders/${order.id}`}
                >
                  Ver Detalle
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Button type="button" className="pedidos-button" onClick={handlePerfil}>
        Volver
      </Button>
    </Container>
  );
};

export default MisPedidos;
