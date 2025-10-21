import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { UserContext } from "../context/UserContext";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { Row, Col, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Link } from "react-router-dom";
import { NumericFormat } from "react-number-format";
import "../assets/css/CardProductGaleria.css";

const CartItemCard = ({
  item,
  agregarProducto,
  quitarProducto,
  quitarProductos,
}) => {
  const subtotal = item.precio * item.count;

  return (
    <Card className="mb-3 shadow-sm border-0">
      <Card.Body className="d-flex flex-column flex-md-row align-items-md-center">
        <Col xs={12} md={5} className="d-flex align-items-center mb-2 mb-md-0">
          <img
            src={item.image_url}
            alt={item.nombre}
            style={{ width: 64, height: 64, objectFit: "cover" }}
            className="rounded me-3 border"
          />
          <div>
            <Card.Title className="h5 mb-0">{item.nombre}</Card.Title>
            <Card.Text className="text-muted small">
              Precio unitario: **${item.precio.toFixed(0)}**
            </Card.Text>
          </div>
        </Col>
        <Col
          xs={6}
          md={3}
          className="d-flex align-items-center justify-content-start justify-content-md-center"
        >
          <div className="d-flex align-items-center">
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={() => quitarProducto(item)}
              className="btn-cant p-1"
            >
              <i className="bi bi-dash"></i> -
            </Button>
            <span className="mx-3 fw-bold">{item.count}</span>
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={() => agregarProducto(item)}
              className="btn-cant p-1"
            >
              <i className="bi bi-plus"></i> +
            </Button>
          </div>
        </Col>
        <Col xs={4} md={3} className="fw-bold text-end text-md-center">
          <NumericFormat
            value={subtotal}
            displayType={"text"}
            thousandSeparator="."
            decimalSeparator=","
            prefix={"$"}
          />
        </Col>
        <Col xs={2} md={1} className="text-end">
          <Button
            variant="light"
            size="sm"
            onClick={() => quitarProductos(item, item.count)}
            aria-label={`Eliminar ${item.nombre} del carrito`}
          >
            <FontAwesomeIcon icon={faTrashCan} size="2x" color="red" />
          </Button>
        </Col>
      </Card.Body>
    </Card>
  );
};

const Cart = () => {
  const {
    cart,
    totalProducts,
    totalPrice,
    agregarProducto,
    quitarProducto,
    quitarProductos,
    checkout,
  } = useContext(CartContext);

  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const showMessage = (message) => {
    console.error(`ERROR: ${message}`);
  };

  const handleCheckout = async () => {
    const result = await checkout();
    if (result.success) {
      navigate("/checkout-success");
    } else {
      showMessage(result.message);
    }
  };

  const handleContinuarCompra = () => navigate("/galeria");

  return (
    <Container className="my-5">
      <div className="carro">
        <h3 className="mb-4 title-cart fw-bold">Detalles del Pedido:</h3>

        {cart.length === 0 ? (
          <Row className="mt-4 justify-content-center">
            <Col xs={12} md={8} className="text-center">
              <Card className="p-5 shadow-lg border-0">
                <p className="lead">
                  El Carrito está vacío. ¡Agrega nuestros productos!
                </p>
                <Button
                  as={Link}
                  to="/galeria"
                  type="button"
                  className="pedidos-button mt-3 w-50 mx-auto"
                >
                  Empezar a Comprar
                </Button>
              </Card>
            </Col>
          </Row>
        ) : (
          <>
            <div className="login-card p-4 shadow-lg rounded-3">
              <Row className="d-none d-md-flex fw-bold text-muted border-bottom pb-2 mb-3">
                <Col md={5}>Producto</Col>
                <Col md={3} className="text-center">
                  Cantidad
                </Col>
                <Col md={3} className="text-center">
                  Subtotal
                </Col>
                <Col md={1} className="text-end">
                  Quitar
                </Col>
              </Row>
              <div>
                {cart.map((item) => (
                  <CartItemCard
                    key={item.id}
                    item={item}
                    agregarProducto={agregarProducto}
                    quitarProducto={quitarProducto}
                    quitarProductos={quitarProductos}
                  />
                ))}
              </div>

              <div className="text-end mt-5 pt-3 border-top">
                <h4 className="text-light">
                  Cantidad de Productos:{" "}
                  <span className="fw-bold text-light">{totalProducts}</span>
                </h4>
                <h2 className="text-light">
                  Valor Total:{" "}
                  <span className="fw-bolder">
                    <NumericFormat
                      value={totalPrice}
                      displayType={"text"}
                      thousandSeparator="."
                      decimalSeparator=","
                      prefix={"$"}
                    />
                  </span>
                </h2>
              </div>

              <Row className="mt-4 justify-content-end">
                <Col xs={12} md={4} className="mb-3 mb-md-0 d-grid">
                  <Button
                    type="button"
                    variant="outline-secondary"
                    className="pedidos-button p-2"
                    onClick={handleContinuarCompra}
                  >
                    Continuar Comprando
                  </Button>
                </Col>
                <Col xs={12} md={4} className="d-grid">
                  <Button
                    type="button"
                    className="logout-button p-2"
                    onClick={handleCheckout}
                  >
                    Finalizar Compra
                  </Button>
                </Col>
              </Row>
            </div>
          </>
        )}
      </div>
    </Container>
  );
};

export default Cart;
