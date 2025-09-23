import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "../assets/css/Home.css";

const renderCard = (title, text, imgSrc) => (
  <Card className="text-center shadow home-card" style={{ height: "100%" }}>
    <Card.Img variant="top" src={imgSrc} />
    <Card.Body>
      <Card.Title style={{ color: "var(--principal)" }}>{title}</Card.Title>
      <Card.Text style={{ color: "var(--secundario)" }}>{text}</Card.Text>
    </Card.Body>
  </Card>
);

function Home() {
  return (
    <>
      <Container fluid className="p-0">
        <Row>
          <Col>
            <div className="home-banner">
              <h1>AQUI VA LA IMAGEN DEL BANNER</h1>
            </div>
          </Col>
        </Row>
      </Container>

      <div style={{ backgroundColor: "var(--fondo)", padding: "3rem 0" }}>
        <Container className="my-5">
          {/* Tres Cards */}
          <Row className="g-4 mb-5 justify-content-center">
            <Col xs={12} md={4}>
              {renderCard(
                "Categoria 1",
                "Descripción breve del producto 1.",
                "https://placehold.co/300x200"
              )}
            </Col>
            <Col xs={12} md={4}>
              {renderCard(
                "Categoria 2",
                "Descripción breve del producto 2.",
                "https://placehold.co/300x200"
              )}
            </Col>
            <Col xs={12} md={4}>
              {renderCard(
                "Categoria 3",
                "Descripción breve del producto 3.",
                "https://placehold.co/300x200"
              )}
            </Col>
          </Row>


          <Row className="my-5 align-items-center">
            <Col className="d-flex align-items-center">
              <hr style={{ flex: 1, borderColor: "var(--secundario)" }} />
            </Col>
            <Col xs="auto">
              <span className="separator-text">PRODUCTOS EN OFERTA</span>
            </Col>
            <Col className="d-flex align-items-center">
              <hr style={{ flex: 1, borderColor: "var(--secundario)" }} />
            </Col>
          </Row>


          <Row className="g-4 mb-5 justify-content-evenly">
            <Col xs={12} md={3}>
              {renderCard(
                "Producto 1",
                "Descripción breve del producto 4.",
                "https://placehold.co/300x200"
              )}
            </Col>
            <Col xs={12} md={3}>
              {renderCard(
                "Producto 2",
                "Descripción breve del producto 5.",
                "https://placehold.co/300x200"
              )}
            </Col>
            <Col xs={12} md={3}>
              {renderCard(
                "Producto 3",
                "Descripción breve del producto 6.",
                "https://placehold.co/300x200"
              )}
            </Col>
            <Col xs={12} md={3}>
              {renderCard(
                "Producto 4",
                "Descripción breve del producto 7.",
                "https://placehold.co/300x200"
              )}
            </Col>
          </Row>

          <Row>
            <Col className="text-center">
              <Button
                style={{
                  backgroundColor: "var(--principal)",
                  borderColor: "var(--principal)",
                }}
                size="lg"
              >
                Ver más
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Home;
