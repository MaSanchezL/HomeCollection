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
import { UserContext } from "../context/UserContext";

const CardProduct = () => {
  const { id } = useParams();
  const API_URL = import.meta.env.VITE_API_URL;
  const [product, setProduct] = useState({});
  const [cantidad, setCantidad] = useState(1);
  const [like, setLike] = useState(false);
  const { agregarProductos } = useContext(CartContext);

  const { user } = useContext(UserContext);

  const getProducyById = async () => {
    try {
      let fetchOptions = {};
      
      if (user) {
        fetchOptions = {
          headers: { Authorization: `Bearer ${user.token}` },
        };
      }

      const res = await fetch(`${API_URL}/products/${id}`, fetchOptions);

      const data = await res.json();
      setProduct(data);
      setLike(data.isFavorite);
    } catch (error) {
      alert(error.message);
    }
  };

  const isFavorite = async () => {
    try {
      const fetchOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      };

      const res = await fetch(`${API_URL}/products/like/${id}`, fetchOptions);

      await res.json();
      await getProducyById();
    } catch (error) {
      alert(error.message);
    }
  };

  const removeFavorite = async () => {
    try {
      const fetchOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      };

      const res = await fetch(`${API_URL}/products/unlike/${id}`, fetchOptions);

      await res.json();
      await getProducyById();
    } catch (error) {
      alert(error.message);
    }
  };

  /*  useEffect(() => {
    if (id) {
      getProducyById();
    }
  }, [id]); */

  useEffect(() => {
    getProducyById();
  }, [id, user]);

  const sumar = () => setCantidad(cantidad + 1);

  const restar = () => {
    if (cantidad > 0) return "No puedes restar más productos";
    setCantidad(cantidad - 1);
  };

  const handleLikeClick = () => {
    setLike(!like);
    if (!like) {
      isFavorite();
    } else {
      removeFavorite();
    }
  };

  /*   const handleAddCartClick = () => {
    agregarProducto(product, cantidad);
  }; */

  return (
    <Card className="carta">
      <Container className="d-flex justify-content-center p-4">
        <Row>
          <Col md={6} className="columnas">
            <Card.Img variant="top" src={product.image_url} />
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
                onClick={restar}
                variant="outline-secondary"
                style={{ width: "90px", margin: "0 auto" }}
                disabled={cantidad === 1}
              >
                -
              </Button>
              <Button
                variant="outline-secondary"
                style={{ width: "90px", margin: "0 auto" }}
              >
                {cantidad}
              </Button>
              <Button
                onClick={sumar}
                variant="outline-secondary"
                style={{ width: "90px", margin: "0 auto" }}
              >
                +
              </Button>
            </Card.Body>

            <Card.Body className="d-flex flex-column justify-content-center gap-4 mb-0">
              <div className="d-flex align-items-center justify-content-center gap-4 mb-0">
                <Button
                  variant="primary"
                  size="lg"
                  style={{ width: "250px", margin: "0 auto" }}
                  /*                   onClick={handleAddCartClick}
                   */ onClick={() => agregarProductos(product, cantidad)}
                >
                  Agregar al carrito
                </Button>

                {
                  // mostrar solo si existe un usuario en el contexto
                  user && (
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
                  )
                }

                <Link to={`/galeria`}> Regresar a la Galería </Link>
                <Link to={`/cart`}> Carro</Link>
              </div>
            </Card.Body>
          </Col>
        </Row>
      </Container>
    </Card>
  );
};

export default CardProduct;
