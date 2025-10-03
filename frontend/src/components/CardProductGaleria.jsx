import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "../assets/css/CardProductGaleria.css";
import CardBody from "react-bootstrap/esm/CardBody";
import { Link } from "react-router-dom";

const CardProductGaleria = ({ id, nombre, imagen, precio }) => {
  return (
    <Card className="carta-galeria">
      <Card.Img variant="top" src={imagen} />
      <Card.Body className="texto">
        <Card.Title>{nombre}</Card.Title>
        <Card.Text className="fw-bold">Precio: {precio.toFixed(0)} </Card.Text>
      </Card.Body>

      <Card.Body>
        <Link to={`/producto/${id}`}>
          <Button
            variant="primary"
            size="lg"
            style={{ width: "200px", margin: "0 auto" }}
          >
            Ver más
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default CardProductGaleria;
