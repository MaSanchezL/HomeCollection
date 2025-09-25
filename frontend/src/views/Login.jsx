import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../assets/css/Login.css';

function Login() {
  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col xs={12} md={6} lg={4}>
          
          <div className="login-card shadow-lg">
            
            <h2 className="login-title">
              Iniciar Sesión
            </h2>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Correo Electrónico</Form.Label>
                <Form.Control 
                  type="email" 
                  placeholder="ejemplo@correo.com" 
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="formBasicPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control 
                  type="password" 
                  placeholder="Contraseña" 
                />
              </Form.Group>
              <Button 
                type="submit" 
                className="login-button" 
              >
                Ingresar
              </Button>
            </Form>
            <p className="text-center mt-3">
              ¿No tienes cuenta? <a href="#register" className="login-link">Regístrate aquí</a>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;