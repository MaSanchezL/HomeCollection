import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav"
import CardProductGaleria from "../components/CardProductGaleria.jsx";
import "../assets/css/GaleriaProductos.css";

const GaleriaProductos = ({categoriaInicial}) => {
  const [card, setCard] = useState([]);
  const [totalProductos, setTotalProductos] = useState(0);
  const [pageActive, setPageActive] = useState(1);
  const [sortPrecio, setSortPrecio] = useState("menor_mayor");
  const [categoria, setCategoria] = useState(categoriaInicial??0);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

  const getcard = async () => {
    try {
      let url= `${API_URL}/products/all?page=${pageActive}&order_by=${sortPrecio}`;
      if(categoria!==0){
        url= `${API_URL}/products/all?categoria=${categoria}&page=${pageActive}&order_by=${sortPrecio}`;
      }
      const res = await fetch(url);
      const data = await res.json();
      setCard(data.productos);
      setTotalProductos(data.total);
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    getcard();
  }, [pageActive, sortPrecio, categoria]);

  const handlePrev = () => {
    if (pageActive > 1) setPageActive(pageActive - 1);
  };

  const handleNext = () => {
    const ultimaPagina = Math.ceil(totalProductos / 6);
    if (pageActive < ultimaPagina) setPageActive(pageActive + 1);
  };

  if (totalProductos===0){ 
     
    return <div>No existen elementos en la base de datos</div>;
  }
  console.log("total de productos", totalProductos)


  return (
    <>
      <Nav
        variant="tabs"
        activeKey={categoria}
        onSelect={(selectedKey) =>
          setCategoria(selectedKey ? parseInt(selectedKey) : null)
        }
        className="mb-4 justify-content-center"
      >
        <Nav.Item>
          <Nav.Link eventKey="0">Todos</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="1">Electrodomésticos</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="2">Cocina</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="3">Muebles</Nav.Link>
        </Nav.Item>
      </Nav>

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
          {card?.map((productos) => (
            <Col key={productos.id}>
              <CardProductGaleria
                nombre={productos.nombre}
                precio={productos.precio}
                imagen={productos.image_url}
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




