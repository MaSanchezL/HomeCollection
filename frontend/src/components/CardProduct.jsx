import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import "../assets/css/CardProduct.css";
import { Link, useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const CardProduct = () => {
  const { id } = useParams();

  const { agregarProducto } = useContext(CartContext);

  const [product, setProduct] = useState({});
  const [cantidad, setCantidad] = useState(0);
  const [like, setLike] = useState(false);

  const getProducyById = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/products/${id}`);
      const data = await res.json();
      setProduct(data);
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    if (id) {
      getProducyById();
    }
  }, [id]);

  const sumar = () => setCantidad(cantidad + 1);

  const restar = () => {
    if (cantidad === 0) return "No puedes restar más productos";
    setCantidad(cantidad - 1);
  };

  const handleLikeClick = () => {
    setLike(!like);
  };

  const handleAddCartClick = () => {
    agregarProducto(product, cantidad);
  };

  return (
    <Card className="carta">
      <Container className="d-flex justify-content-center p-4">
        <Row>
          <Col md={6} className="columnas">
            <Card.Img variant="top" src={product.imagen} />
            <Card.Body>
              <Card.Text>{product.descripcion}</Card.Text>
            </Card.Body>
          </Col>

          <Col md={6} className="columnas">
            <Card.Body className="derecho">
              <Card.Title>{product.nombre}</Card.Title>
              <Card.Text className="fw-bold">
                Precio: {product.precio}
              </Card.Text>
            </Card.Body>

            <Card.Body className="cantidad">
              <Card.Text>Cantidad:</Card.Text>
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

            <Card.Body className="d-flex flex-column justify-content-center gap-4 mb-0">
              <div className="d-flex align-items-center justify-content-center gap-4 mb-0">
                <Button
                  variant="primary"
                  size="lg"
                  style={{ width: "250px", margin: "0 auto" }}
                  onClick={handleAddCartClick}
                >
                  Agregar al carrito
                </Button>

                <Button
                  onClick={handleLikeClick}
                  style={{ border: "none", backgroundColor: "transparent" }} // opcional quitar borde
                >
                  <FontAwesomeIcon
                    icon={faHeart}
                    size="2x"
                    color={like ? "red" : "gray"} // cambia color según estado
                  />
                </Button>

                <Link to={`/galeria`}> Regresar a la Galería </Link>
              </div>
            </Card.Body>
          </Col>
        </Row>
      </Container>
    </Card>
  );
};

export default CardProduct;
