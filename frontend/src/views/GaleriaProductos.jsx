import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Pagination from "react-bootstrap/Pagination";
import CardProductGaleria from "../components/CardProductGaleria.jsx";
import { useEffect, useState } from "react";
import "../assets/css/GaleriaProductos.css";
import Form from "react-bootstrap/Form";

const GaleriaProductos = () => {
  const [card, setCard] = useState([]);
  const [totalProductos, setTotalProductos] = useState(0);
  const [pageActive, setPageActive] = useState(1);
  const [sortPrecio, setSortPrecio] = useState("menor_mayor");

  const getcard = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/products/all?page=${pageActive}&sortDirection=${sortPrecio}`
      );
      const data = await res.json();
      setCard(data.productos);
      setTotalProductos(data.total);
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    getcard();
  }, [pageActive, sortPrecio]);

  const handlePrev = () => {
    if (pageActive > 1) setPageActive(pageActive - 1);
  };

  const handleNext = () => {
    const ultimaPagina = totalProductos / 10;
    if (pageActive < ultimaPagina) setPageActive(pageActive + 1);
  };

  return (
    <>
      <Form.Select
        className=""
        aria-label="Default select example"
        onChange={(e) => {
          setSortPrecio(e.target.value);
        }}
      >
        <option>Ordenar por</option>
        <option value="mayor_menor">Mayor a menor precio</option>
        <option value="menor_mayor">Menor a mayor</option>
      </Form.Select>

      <Container>
        <Row xs={1} sm={2} lg={3} className="g-4 m-2">
          {card.map((productos) => (
            <Col key={productos.id}>
              <CardProductGaleria
                nombre={productos.nombre}
                precio={productos.precio}
                imagen={productos.imagen}
                id={productos.id}
              />
            </Col>
          ))}
        </Row>
      </Container>

      <div className="pag">
        <nav aria-label="Page navigation example">
          <ul class="pagination">
            <li class="page-item" onClick={handlePrev}>
              <div class="page-link" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </div>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">
                {pageActive}
              </a>
            </li>
            <li class="page-item" onClick={handleNext}>
              <div class="page-link" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default GaleriaProductos;