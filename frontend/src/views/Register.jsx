import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../assets/css/Login.css";
import { Link } from "react-router-dom";

function Register() {
  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={7}>
          <div className="login-card shadow-lg">
            <h2 className="login-title">Crear Cuenta</h2>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Nombre Completo</Form.Label>
                <Form.Control type="text" placeholder="Introduce tu nombre" />
              </Form.Group>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicDocument">
                    <Form.Label>Número de Documento</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nro de Rut o documento"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Correo Electrónico</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="ejemplo@correo.com"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3" controlId="formBasicAddress">
                <Form.Label>Dirección</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Introduce tu dirección"
                />
              </Form.Group>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control type="password" placeholder="******" />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group
                    className="mb-4"
                    controlId="formBasicConfirmPassword"
                  >
                    <Form.Label>Confirmar Contraseña</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Repite la Contraseña"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Button type="submit" className="login-button">
                Registrarme
              </Button>
            </Form>
            <p className="text-center mt-3">
              ¿Ya tienes cuenta?{" "}
              <Link to="/login" className="login-link">
                Inicia Sesión aquí
              </Link>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;
