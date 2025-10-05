import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import CardProductGaleria from "../components/CardProductGaleria.jsx";
import "../assets/css/GaleriaProductos.css";

const GaleriaProductos = () => {
  const [card, setCard] = useState([]);
  const [totalProductos, setTotalProductos] = useState(0);
  const [pageActive, setPageActive] = useState(1);
  const [sortPrecio, setSortPrecio] = useState("menor_mayor");

  const API_URL = import.meta.env.VITE_API_URL;

  const getcard = async () => {
    try {
  const res = await fetch(`${API_URL}/products/all?page=${pageActive}&sortDirection=${sortPrecio}`);
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
    const ultimaPagina = Math.ceil(totalProductos / 6);
    if (pageActive < ultimaPagina) setPageActive(pageActive + 1);
  };

  return (
    <>
      <Form.Select
        className="mb-3"
        aria-label="Ordenar productos"
        onChange={(e) => setSortPrecio(e.target.value)}
        value={sortPrecio}
      >
        <option value="menor_mayor">Menor a mayor precio</option>
        <option value="mayor_menor">Mayor a menor precio</option>
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
        <nav aria-label="Navegación de páginas">
          <ul className="pagination justify-content-center">
            <li
              className={`page-item ${pageActive === 1 ? "disabled" : ""}`}
              onClick={handlePrev}
            >
              <div className="page-link" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </div>
            </li>
            <li className="page-item">
              <div className="page-link">{pageActive}</div>
            </li>
            <li
              className={`page-item ${
                pageActive === Math.ceil(totalProductos / 6) ? "disabled" : ""
              }`}
              onClick={handleNext}
            >
              <div className="page-link" aria-label="Next">
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
