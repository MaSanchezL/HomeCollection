import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Pagination from "react-bootstrap/Pagination";
import CardProductGaleria from "../components/CardProductGaleria.jsx";
import { useEffect, useState } from "react";
import '../assets/css/GaleriaProductos.css'
import Form from "react-bootstrap/Form";


const productos = [
  {
    id: 1,
    nombre: "Laptop Pro 15",
    precio: 1299.99,
    imagen: "https://placehold.co/300x200",
    descripcion:
      "Portátil de alto rendimiento con pantalla de 15 pulgadas y procesador de última generación.",
  },
  {
    id: 2,
    nombre: "Smartphone X",
    precio: 899.5,
    imagen: "https://placehold.co/300x200",
    descripcion:
      "Teléfono inteligente con cámara de 108 MP y batería de larga duración.",
  },
  {
    id: 3,
    nombre: "Auriculares Inalámbricos",
    precio: 149.9,
    imagen: "https://placehold.co/300x200",
    descripcion:
      "Auriculares bluetooth con cancelación activa de ruido y estuche de carga.",
  },
  {
    id: 4,
    nombre: "Monitor UltraWide 34”",
    precio: 599.0,
    imagen: "https://placehold.co/300x200",
    descripcion:
      "Pantalla curva de 34 pulgadas con resolución QHD para multitarea y gaming.",
  },
  {
    id: 5,
    nombre: "Teclado Mecánico RGB",
    precio: 120.75,
    imagen: "https://placehold.co/300x200",
    descripcion:
      "Teclado mecánico retroiluminado con switches rojos y diseño ergonómico.",
  },
  {
    id: 6,
    nombre: "Mouse Gamer Pro",
    precio: 79.99,
    imagen: "https://placehold.co/300x200",
    descripcion:
      "Ratón óptico con 8 botones programables y sensor de alta precisión.",
  },
  {
    id: 7,
    nombre: "Smartwatch Fit",
    precio: 199.9,
    imagen: "https://placehold.co/300x200",
    descripcion:
      "Reloj inteligente con monitoreo de salud, GPS integrado y resistencia al agua.",
  },
  {
    id: 8,
    nombre: "Cámara Reflex 24MP",
    precio: 749.0,
    imagen: "https://placehold.co/300x200",
    descripcion:
      "Cámara digital con sensor de 24 megapíxeles y lente intercambiable.",
  },
  {
    id: 9,
    nombre: "Silla Ergonómica",
    precio: 320.0,
    imagen: "https://placehold.co/300x200",
    descripcion:
      "Silla de oficina ergonómica con soporte lumbar y ajuste de altura.",
  },
  {
    id: 10,
    nombre: "Tablet 10”",
    precio: 450.0,
    imagen: "https://placehold.co/300x200",
    descripcion:
      "Tableta de 10 pulgadas con pantalla Full HD y 128 GB de almacenamiento.",
  },
];

const GaleriaProductos = () => {
  const [card, setCard] = useState([]);

  const getcard = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/pizzas");
      const data = await res.json();
      setCard(productos);
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    getcard();
  }, []);


 


  return (
    <>
    
        <Form.Select className ="" aria-label="Default select example">
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