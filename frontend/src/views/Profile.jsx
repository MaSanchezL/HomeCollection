import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import "../assets/css/Login.css";

function Profile() {
  const { user, logout, loading } = useContext(UserContext);
  const navigate = useNavigate();

  if (loading) return <p>Cargando usuario...</p>; // espera hasta verificar token
  if (!user) return <p>No estás logueado</p>;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleCrearProducto = () => navigate("/crear-producto");
  const misPedidos = () => navigate("/pedidos");

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <div className="login-card shadow-lg">
            <h2 className="login-title">Mi Perfil de Usuario</h2>
            <ListGroup variant="flush" className="mb-4">
              <ListGroup.Item>
                <div className="fw-bold">Nombre Completo:</div>
                <p className="mb-0">{user?.nombre || "Sin nombre"}</p>
              </ListGroup.Item>
              <ListGroup.Item>
                <div className="fw-bold">Correo Electrónico:</div>
                <p className="mb-0">{user?.email}</p>
              </ListGroup.Item>
              <ListGroup.Item>
                <div className="fw-bold">Número de Documento:</div>
                <p className="mb-0">{user?.nro_documento || "No registrado"}</p>
              </ListGroup.Item>
              <ListGroup.Item>
                <div className="fw-bold">Dirección:</div>
                <p className="mb-0">{user?.direccion || "No registrada"}</p>
              </ListGroup.Item>
              {/* {user?.rol_administrador && (
                <ListGroup.Item>
                  <p className="text-success fw-bold">Administrador</p>
                </ListGroup.Item>
              )} */}
            </ListGroup>
            <Row className="mt-4 align-items-center">
              <Col xs={4}>
                <Button type="button" className="pedidos-button" onClick={misPedidos}>
                  Mis Pedidos
                </Button>
              </Col>
              {user?.rol_administrador && (
                <Col xs={4}>
                  <Button type="button" className="pedidos-button" onClick={handleCrearProducto}>
                    Crear Producto
                  </Button>
                </Col>
              )}
              <Col xs={4}>
                <Button type="button" className="logout-button" onClick={handleLogout}>
                  Cerrar Sesión
                </Button>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Profile;
