import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "../assets/css/Home.css";
import { useEffect, useState } from "react";


const renderCard = (title, text, imgSrc, url) => (
  <Link to={url} style={{ textDecoration: "none", color: "inherit" }}>
    <Card className="text-center shadow home-card" style={{ height: "100%" }}>
      <Card.Img variant="top" src={imgSrc} />
      <Card.Body>
        <Card.Title style={{ color: "var(--principal)" }}>{title}</Card.Title>
        <Card.Text style={{ color: "var(--secundario)" }}>{text}</Card.Text>
      </Card.Body>
    </Card>
  </Link>
);

function Home() {

  const [randomProducts, setRandomProducts] = useState([]);

    useEffect(() => {
      const HomeRandomProducts= async () =>{
        try {
          const res = await fetch("${API_URL}/products//random");
          const data = await res.json();
          setRandomProducts(data);
        } catch (error) {
          alert(error.message);
        }
      }; 


        HomeRandomProducts();

    }, [] );


  return (
    <>
      <Container fluid className="p-0">
        <Row>
          <Col>
            <div className="home-banner">
              <h1>AQUI VA LA IMAGEN DEL BANNER</h1>
            </div>
          </Col>
        </Row>
      </Container>

      <div style={{ backgroundColor: "var(--fondo)", padding: "3rem 0" }}>
        <Container className="my-5">
          {/* Tres Cards */}
          <Row className="g-4 mb-5 justify-content-center">
            <Col xs={12} md={4}>
              {renderCard(
                "Electrodomesticos",
                "Todo lo que necesitas a un clic!",
                "https://images.falabella.com/v3/assets/blt6a203fe6c6a9b6dd/blt2e8a81f5ba276a2b/66287084c1564563b781b303/cat2034.jpg?auto=webp&disable=upscale&quality=70&width=1280",
                "/galeria/electrodomesticos"
              )}
            </Col>
            <Col xs={12} md={4}>
              {renderCard(
                "Cocina",
                "Todo lo que necesitas a un clic!",
                "https://images.falabella.com/v3/assets/blt6a203fe6c6a9b6dd/bltc453ac1b6e076db2/670edc9b2fb22e20e25b070a/w_1500_h_1500_fit_pad.avif",
                "/galeria/cocina"
              )}
            </Col>
            <Col xs={12} md={4}>
              {renderCard(
                "Muebles",
                "Todo lo que necesitas a un clic!",
                "https://images.falabella.com/v3/assets/blt6a203fe6c6a9b6dd/blt0f4c56b15acf4817/662862f5cb83740116a660f3/CAT16610015.jpg?auto=webp&disable=upscale&quality=70&width=1280",
                "/galeria/muebles"
              )}
            </Col>
          </Row>

          <Row className="my-5 align-items-center">
            <Col className="d-flex align-items-center">
              <hr style={{ flex: 1, borderColor: "var(--secundario)" }} />
            </Col>
            <Col xs="auto">
              <span className="separator-text">
                ESTOS PRODUCTOS TE PUEDEN INTERESAR
              </span>
            </Col>
            <Col className="d-flex align-items-center">
              <hr style={{ flex: 1, borderColor: "var(--secundario)" }} />
            </Col>
          </Row>

          <Row className="g-4 mb-5 justify-content-evenly">
            {randomProducts.map((product) => (
              <Col key={product.id} xs={12} md={3}>              
              
                  {renderCard(
                    product.nombre,
                    product.descripcion,
                    product.image_url,
                    `/producto/${product.id}`
                  )}
                
              </Col>
            ))}
          </Row>

          <Row>
            <Col className="text-center">
              <Button
                as={Link}
                to="/galeria"
                style={{
                  backgroundColor: "var(--principal)",
                  borderColor: "var(--principal)",
                }}
                size="lg"
              >
                Ver más
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Home;

