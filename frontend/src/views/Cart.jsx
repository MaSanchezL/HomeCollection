import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { UserContext } from "../context/UserContext";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { Row, Col } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import "../assets/css/CardProductGaleria.css";

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

  const handleCheckout = async () => {
    const result = await checkout();
    if (result.success) {
      navigate("/checkout-success");
    } else {
      alert(result.message);
    }
  };

  const handleContinuarCompra = () => navigate("/galeria");

  return (
    <Container className="my-5">
      <div className="carro">
        <h3 className="mb-4">Detalles del Pedido:</h3>

        {cart.length === 0 ? (
          <>
            <Row className="mt-4 align-items-center">
              <div className="login-card">
                <p>El Carrito está vacío. ¡Agrega nuestros productos!</p>
                <Col xs={4}>
                  <Button
                    as={Link}
                    to="/galeria"
                    type="button"
                    className="pedidos-button"
                  >
                    Empezar a Comprar
                  </Button>
                </Col>
              </div>
            </Row>
          </>
        ) : (
          <>
            <div className="login-card">
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Nombre</th>
                    <th>Precio Unitario</th>
                    <th>Cantidad</th>
                    <th>Subtotal</th>
                    <th>Eliminar</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <img
                          src={item.image_url}
                          alt={item.nombre}
                          style={{ width: 50, height: 50, objectFit: "cover" }}
                        />
                      </td>
                      <td>{item.nombre}</td>
                      <td>${item.precio.toFixed(0)}</td>
                      <td>
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          onClick={() => quitarProducto(item)}
                          className="me-2 btn-cant"
                        >
                          -
                        </Button>
                        {item.count}
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          onClick={() => agregarProducto(item)}
                          className="ms-2 btn-cant"
                        >
                          +
                        </Button>
                      </td>
                       <td className="button-mobile">
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          onClick={() => quitarProducto(item)}
                          className="me-2"
                        >
                          -
                        </Button>
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          onClick={() => agregarProducto(item)}
                          className="ms-2"
                        >
                          +
                        </Button>
                      </td>
                      <td>${(item.precio * item.count).toFixed(0)}</td>
                      <td>
                        <Button
                          size="sm"
                          onClick={() => quitarProductos(item, item.count)}
                        >
                          ❌
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              <div className="text-end mt-4">
                <h4>
                  Cantidad de Productos:{" "}
                  <span className="fw-bold">{totalProducts}</span>
                </h4>
                <h2>
                  Valor Total:{" "}
                  <span className="fw-bold">${totalPrice.toFixed(0)}</span>
                </h2>
              </div>

              <Row className="mt-4 align-items-center">
                <Col xs={4}>
                  <Button
                    type="button"
                    className="pedidos-button"
                    onClick={handleContinuarCompra}
                  >
                    Continuar Comprando
                  </Button>
                </Col>

                <Col xs={4}>
                  <Button
                    type="button"
                    className="logout-button"
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
