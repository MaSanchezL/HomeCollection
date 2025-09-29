import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "../assets/css/CardProductGaleria.css";
import CardBody from "react-bootstrap/esm/CardBody";
import { Link } from "react-router-dom";

import { Table } from "react-bootstrap";
import { ProductContext } from "../context/ProductContext";

const Cart = () => {
  const { data, setData } = useContext(ProductContext);
  const { cart, agregarProducto } = useContext(CartContext);

  console.log(data);
  console.log("trae los productos");

  console.log(cart);
  console.log("no trae los agregados");

  return (
    <>
      <Card>
        <Card.Body>
          <Container>
            <Col>
              <Row xs={1} sm={2} lg={3} className="g-6 m-2">
                <Card className="carta-galeria">
                  <Card.Img variant="top" src={cart.imagen} />
                </Card>
                <br />
                <Card className="carta-galeria">
                  <Card.Body className="texto">
                    <Card.Title className="fw-bold">
                      Nombre Producto: {cart.nombre}
                    </Card.Title>
                    <Card.Text className="fw-bold">
                      Precio: {cart.precio}{" "}
                    </Card.Text>
                  </Card.Body>
                  <Card.Body className="cantidad">
                    <Button
                      variant="outline-secondary"
                      style={{ width: "60px", margin: "0 auto" }}
                    >
                      +
                    </Button>
                    <Button
                      variant="outline-secondary"
                      style={{ width: "60px", margin: "0 auto" }}
                    ></Button>
                    <Button
                      variant="outline-secondary"
                      style={{ width: "60px", margin: "0 auto" }}
                    >
                      -
                    </Button>
                    <span
                      /* onClick={() => removePost(i)} */
                      role="button"
                    >
                      ❌
                    </span>
                  </Card.Body>
                </Card>
                <Card className="carta-galeria">
                  <Card.Body className="texto">
                    <Card.Title className="fw-bold">
                      Cantidad :{cart.cantidad}
                    </Card.Title>
                    <Card.Text className="fw-bold">
                      Total: {cart.total}{" "}
                    </Card.Text>

                    <Button
                      variant="primary"
                      size="lg"
                      style={{ width: "250px", margin: "0 auto" }}
                    >
                      Finalizar Compra
                    </Button>
                  </Card.Body>
                </Card>
                <br />
              </Row>
            </Col>
            <Card className="texto">
              <Card.Text></Card.Text>
              <div class="container text-center">
                <div class="row row-cols-2">
                  <div class="col fw-bold">Cantidad :</div>
                  <div class="col fw-bold">. 0 {cart.cantidad}</div>
                  <div class="col fw-bold">Total : </div>
                  <div class="col fw-bold">$ 0 {cart.total}</div>
                </div>
                <Card.Text></Card.Text>
                <br />
                <div className="d-flex align-items-center justify-content-center gap-4 mb-0">
                  <Button
                    variant="primary"
                    size="lg"
                    style={{ width: "250px", margin: "0 auto" }}
                  >
                    Finalizar Compra
                  </Button>
                </div>
                <Card.Text></Card.Text>
              </div>
              <br />
            </Card>
          </Container>
        </Card.Body>
      </Card>
    </>
  );
};

export default Cart;
