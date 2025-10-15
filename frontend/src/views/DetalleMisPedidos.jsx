import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";

const DetalleMisPedidos = () => {
  const { user } = useContext(UserContext);
  const { id } = useParams();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handlePedidos = () => {
    navigate("/pedidos");
  };

  useEffect(() => {
    const fetchOrdersById = async () => {
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

        if (!res.ok) throw new Error("Error al obtener pedidos");

        const data = await res.json();
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrdersById();
  }, []);

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
              {/*               <td>{new Date(order.created_at).toLocaleDateString()}</td>
               */}
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
            </tr>
          ))}
        </tbody>
      </Table>

      <Button type="button" className="pedidos-button" onClick={handlePedidos}>
        Volver
      </Button>
    </Container>
  );
};

export default DetalleMisPedidos;
