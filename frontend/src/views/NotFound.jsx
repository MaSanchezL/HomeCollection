import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../assets/css/Login.css";

function NotFound() {
  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6} className="text-center">
          <div className="login-card shadow-lg">
            <h2 className="login-title mb-4">404 - Página no encontrada</h2>
           <img
  src="https://raw.githubusercontent.com/shuoros/john-travolta-404/refs/heads/main/travolta.gif"
  alt="Página no encontrada"
  style={{ maxWidth: "100%", height: "auto" }}
/>
            <p className="mt-4">
              Lo sentimos, la página que buscas no existe o ha sido movida.
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default NotFound;