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

  const getcard = async () => {
    try {
    
      const res = await fetch("http://localhost:3000/api/product/all");
      const data = await res.json();
      setCard(data);
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    getcard();
  }, []);

  return (
    <>
      <Form.Select className="" aria-label="Default select example">
        <option>Ordenar por</option>
        <option value="1">Mayor a menor precio</option>
        <option value="2">Menor a mayor</option>
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
            <li class="page-item">
              <a class="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">
                1
              </a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">
                2
              </a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">
                3
              </a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default GaleriaProductos;

/*
let active = 2;
 let items = [];
 for (let number = 1; number <= 5; number++) {
   items.push(
     <Pagination.Item key={number} active={number === active}>
       {number}
     </Pagination.Item>
   );




<Pagination>{items}</Pagination>
        <br />
        
        



        filtros
        
        const [priceFilter, setPriceFilter] = useState("");

const filteredProducts = card.filter((p) => {
  if (priceFilter === "low") return p.precio < 200;
  if (priceFilter === "medium") return p.precio >= 200 && p.precio < 600;
  if (priceFilter === "high") return p.precio >= 600;
  return true; // sin filtro
});

...

<div className="mb-4">
  <select
    className="form-select"
    value={priceFilter}
    onChange={(e) => setPriceFilter(e.target.value)}
  >
    <option value="">Todos los precios</option>
    <option value="low">Menos de $200</option>
    <option value="medium">$200 - $599</option>
    <option value="high">Más de $600</option>
  </select>
</div>

        
        
        
        
        
        
        
        */
