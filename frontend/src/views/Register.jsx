import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../assets/css/Login.css";

function Register() {
  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [nroDocumento, setNroDocumento] = useState("");
  const [email, setEmail] = useState("");
  const [direccion, setDireccion] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre,
          nro_documento: nroDocumento,
          email,
          direccion,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Error al registrar usuario");
        return;
      }

      await login(email, password);
      navigate("/profile");
    } catch (err) {
      console.error(err);
      setError("Error de conexión con el servidor");
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={7}>
          <div className="login-card shadow-lg">
            <h2 className="login-title">Crear Cuenta</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Nombre Completo</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Introduce tu nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Número de Documento</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Rut o documento"
                  value={nroDocumento}
                  onChange={(e) => setNroDocumento(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Correo Electrónico</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="ejemplo@correo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Dirección</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Introduce tu dirección"
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                  required
                />
              </Form.Group>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="******"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-4">
                    <Form.Label>Confirmar Contraseña</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Repite la Contraseña"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              {error && <p className="text-danger">{error}</p>}

              <Button type="submit" className="login-button">
                Registrarme
              </Button>
            </Form>

            <p className="text-center mt-3">
              ¿Ya tienes cuenta?{" "}
              <a href="/login" className="login-link">
                Inicia Sesión aquí
              </a>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;
