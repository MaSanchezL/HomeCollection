import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "../assets/css/CardProductGaleria.css";
import CardBody from "react-bootstrap/esm/CardBody";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { faFilePen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CardProductGaleria = ({ id, nombre, imagen, precio }) => {
  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(`/editar-producto/${id}`);
  }

  return (
    <Card className="carta-galeria">
      <Card.Img variant="top" src={imagen} />
      <Card.Body className="texto">
        <Card.Title>{nombre}</Card.Title>
        <Card.Text className="fw-bold">
          Precio: {parseFloat(precio).toFixed(0)}{" "}
        </Card.Text>
      </Card.Body>
      <Card.Body>
        <Link to={`/producto/${id}`}>
          <Button
            variant="primary"
            size="lg"
            style={{ width: "150px", margin: "0 auto" }}
          >
            Ver más
          </Button>
        </Link>
      </Card.Body>
      <Card.Body className="d-flex justify-content-end">
        {user && user.rol_administrador && (
          <Button
            onClick={handleEditClick}
            style={{ border: "none", backgroundColor: "transparent" }}
          >
            <FontAwesomeIcon icon={faFilePen} size="2x" color="blue" />
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};


export default CardProductGaleria;
