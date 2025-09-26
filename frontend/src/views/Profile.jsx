import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import "../assets/css/Login.css";

function Profile() {
  const userData = {
    nombre: "Juan Pérez",
    email: "juan.perez@tienda.com",
    documento: "12.345.678-9",
    direccion: "Av. Siempre Viva 742",
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <div className="login-card shadow-lg">
            <h2 className="login-title">Mi Perfil de Usuario</h2>
            <ListGroup variant="flush" className="mb-4">
              <ListGroup.Item>
                <div className fw-bold>Nombre Completo:</div>
                <p className="mb-0">{userData.nombre}</p>
              </ListGroup.Item>
              <ListGroup.Item>
                <div class fw-bold>Correo Electrónico:</div>
                <p className="mb-0">{userData.email}</p>
              </ListGroup.Item>
              <ListGroup.Item>
                <div class fw-bold>Número de Documento:</div>
                <p className="mb-0">{userData.documento}</p>
              </ListGroup.Item>
              <ListGroup.Item>
                <div class fw-bold>Dirección:</div>
                <p className="mb-0">{userData.direccion}</p>
              </ListGroup.Item>
               <ListGroup.Item>
              </ListGroup.Item>
            </ListGroup>
            <Row className="mt-4 align-items-center">
              <Col xs={6}>
                <Button type="button" className="pedidos-button">
                  Mis Pedidos
                </Button>
              </Col>
              <Col xs={6}>
                <Button type="button" className="logout-button">
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