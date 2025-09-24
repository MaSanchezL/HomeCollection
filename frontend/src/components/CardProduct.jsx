import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState } from "react";
import { HeartFill } from "react-bootstrap-icons";

const CardProduct = ({ id, nombre, imagen, descripcion, precio }) => {
  const [cantidad, setCantidad] = useState(0);
  //const [like, setLikes] = useState();

  const sumar = () => setCantidad(cantidad + 1);
  const restar = () => {
    if (cantidad === 0) return "No puedes restar màs productos";
    setCantidad(cantidad - 1);
  };

  return (
    <Card className="mb-4 shadow-sm p-4">
      <Container className="d-flex justify-content-center p-4">
        <Row>
          <Col md={6}>
            <Card.Img variant="top" src={imagen} />
            <Card.Body>
              <Card.Text>{descripcion}</Card.Text>
            </Card.Body>
          </Col>

          <Col md={6}>
            <Card.Body className="d-flex flex-column justify-content-center gap-4 mb-2">
              <Card.Title>{nombre}</Card.Title>
              <Card.Text className="fw-bold">Precio: </Card.Text>
            </Card.Body>
            <Card.Body className="d-flex  justify-content-between">
              <Card.Text className="fw-bold ">Cantidad:</Card.Text>
              <Button
                onClick={sumar}
                variant="outline-secondary"
                style={{ width: "90px", margin: "0 auto" }}
              >
                +
              </Button>
              <Button
                variant="outline-secondary"
                style={{ width: "90px", margin: "0 auto" }}
              >
                {cantidad}
              </Button>
              <Button
                onClick={restar}
                variant="outline-secondary"
                style={{ width: "90px", margin: "0 auto" }}
              >
                -
              </Button>
            </Card.Body>

            <Card.Body className="d-flex flex-column justify-content-center gap-4 mb-2">
              <div className="d-flex align-items-center justify-content-center">
                <Button
                  variant="primary"
                  size="lg"
                  style={{ width: "350px", margin: "0 auto" }}
                >
                  Agregar al carrito
                </Button>

                <HeartFill color="red" size={32} className="m-4" />
              </div>
            </Card.Body>
          </Col>
        </Row>
      </Container>
    </Card>
  );
};

export default CardProduct;
