import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { Table } from "react-bootstrap";
import "../assets/css/CardProductGaleria.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const {
    cart,
    totalProducts,
    totalPrice,
    agregarProducto,
    quitarProducto,
    quitarProductos,
  } = useContext(CartContext);
  const navigate = useNavigate();
  const handleCheckout = () => {
    navigate("/checkout-success");
  };
  return (
    <Container className="my-5">
      <div className="carro">
        <h3 className="mb-4">Detalles del Pedido:</h3>

        {cart.length === 0 ? (
          <p>El Carrito está vacío. ¡Agrega nuestros productos!</p>
        ) : (
          <>
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
                        src={item.imagen}
                        alt={item.nombre}
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                        }}
                      />
                    </td>
                    <td>{item.nombre}</td>
                    <td>${item.precio.toFixed(0)}</td>
                    <td>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => quitarProducto(item)}
                        style={{ marginRight: "5px" }}
                      >
                        -
                      </Button>
                      <span className="mx-2">{item.count}</span>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => agregarProducto(item)}
                        style={{ marginLeft: "5px" }}
                      >
                        +
                      </Button>
                    </td>
                    <td>${(item.precio * item.count).toFixed(0)}</td>
                    <td>
                      <Button
                        /*                         variant="danger"
                         */ size="sm"
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
            <div className="d-grid gap-2 mt-4">
              <Button variant="primary" size="lg" className="buttonPagar">
                <Link
                  to="/galeria"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Continuar Comprando
                </Link>
              </Button>
            </div>
            <div className="d-grid gap-2 mt-4">
              <Button
                variant="primary"
                size="lg"
                className="buttonPagar"
                onClick={handleCheckout}
                a
              >
                Finalizar Compra
              </Button>
            </div>
          </>
        )}
      </div>
    </Container>
  );
};

export default Cart;
