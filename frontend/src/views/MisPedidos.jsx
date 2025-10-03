import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const MisPedidos = () => {
  // ----------------------------------------------------------------------
  // --- ESTADOS SIMULADOS (DEBEN SER LLENADOS POR TU API) ---
  // ----------------------------------------------------------------------
  const [orders, setOrders] = useState([]); // Lista de pedidos
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado de error

  const navigate = useNavigate();

  const handlePerfil = () => {
    navigate("/profile");
  };
  // Simulación de carga de datos (¡Reemplaza esto con tu llamada real a la API!)
  useEffect(() => {
    // Simular una llamada API y obtener datos
    setTimeout(() => {
      const dataSimulada = [
        {
          id: "60d5ec498c3b6f00155b8e91",
          date: "2024-10-01T10:00:00Z",
          totalProducts: 3,
          totalAmount: 159.97,
          status: "Enviado",
        },
        {
          id: "60d5ec498c3b6f00155b8e92",
          date: "2024-09-25T14:30:00Z",
          totalProducts: 1,
          totalAmount: 99.5,
          status: "Procesando",
        },
        // Descomenta la siguiente línea para simular un historial vacío:
        // ...
      ];
      setOrders(dataSimulada);
      // setOrders([]); // Usar para probar el estado "vacío"
      setLoading(false);
      // setError("Error de conexión con el servidor."); // Usar para probar el estado "error"
    }, 1500);
  }, []);

  // ----------------------------------------------------------------------
  // --- LÓGICA DE RENDERIZADO CONDICIONAL ---
  // ----------------------------------------------------------------------

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
          <i className="bi bi-info-circle-fill me-2"></i>
          Aún no has realizado ningún pedido.
        </Alert>
        <Button as={Link} to="/Galeria" variant="primary" className="mt-3">
          Empezar a Comprar
        </Button>
      </Container>
    );
  }

  // ----------------------------------------------------------------------
  // --- VISTA DE TABLA DE PEDIDOS ---
  // ----------------------------------------------------------------------
  return (
    <Container className="my-5">
      <h1 className="mb-4 text-center">Mi Historial de Pedidos</h1>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID Pedido</th>
            <th>Fecha</th>
            <th>Total Productos</th>
            <th>Monto Total</th>
            <th>Estado</th>
            <th>Detalle</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>#{order.id.slice(0, 8)}...</td>
              {/* Formatea la fecha para mejor legibilidad */}
              <td>{new Date(order.date).toLocaleDateString()}</td>
              <td>{order.totalProducts}</td>
              <td className="fw-bold">${order.totalAmount.toFixed(2)}</td>
              <td>
                {/* Asigna una clase de Bootstrap basada en el estado */}
                <span
                  className={`badge ${
                    order.status === "Enviado"
                      ? "bg-success"
                      : "bg-warning text-dark"
                  }`}
                >
                  {order.status}
                </span>
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
      <Button
        type="button"
        className="pedidos-button"
        link
        to="/profile"
        onClick={handlePerfil}
      >
        Volver
      </Button>
    </Container>
  );
};

export default MisPedidos;
