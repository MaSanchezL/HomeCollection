import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "../assets/css/Home.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

function Home() {
  const [randomProducts, setRandomProducts] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  useEffect(() => {
    const HomeRandomProducts = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/products/random`
        );
        const data = await res.json();
        setRandomProducts(data);
      } catch (error) {
        alert(error.message);
      }
    };
    HomeRandomProducts();
  }, []);

  const featuredCards = [
    {
      title: "Electrodomésticos",
      text: "Tecnología moderna que facilita tu hogar, con calidad y eficiencia garantizada.",
      img: "https://images.falabella.com/v3/assets/blt6a203fe6c6a9b6dd/blt2e8a81f5ba276a2b/66287084c1564563b781b303/cat2034.jpg?auto=webp&disable=upscale&quality=70&width=1280",
      url: "/galeria/electrodomesticos",
    },
    {
      title: "Cocina",
      text: "Equipamiento de cocina práctico y moderno, ideal para tus recetas favoritas.",
      img: "https://images.falabella.com/v3/assets/blt6a203fe6c6a9b6dd/bltc453ac1b6e076db2/670edc9b2fb22e20e25b070a/w_1500_h_1500_fit_pad.avif",
      url: "/galeria/cocina",
    },
    {
      title: "Muebles",
      text: "Muebles funcionales y elegantes, que transforman tu hogar con estilo único.",
      img: "https://images.falabella.com/v3/assets/blt6a203fe6c6a9b6dd/blt0f4c56b15acf4817/662862f5cb83740116a660f3/CAT16610015.jpg?auto=webp&disable=upscale&quality=70&width=1280",
      url: "/galeria/muebles",
    },
  ];

  const renderMiniCard = (card, index) => (
    <Link
      key={index}
      to={card.url}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div className="mini-card">
        <div className="mini-card-body">
          <h6
            style={{ color: "var(--principal)", fontSize: "0.9rem", margin: 0 }}
          >
            {card.title}
          </h6>
        </div>
        <div
          className="progress-bar"
          style={{
            animation:
              activeIndex === index
                ? "progressAnimation 5s linear forwards"
                : "none",
          }}
        ></div>
      </div>
    </Link>
  );
  return (
    <>
      <Container fluid className="p-0 hero-slide">
        <Swiper
          ref={swiperRef}
          modules={[Autoplay]}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={true}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        >
          {featuredCards.map((card) => (
            <SwiperSlide key={card.title}>
              <div className="slide-content image-left">
                <div className="slide-image">
                  <img src={card.img} alt={card.title} />
                </div>
                <div className="slide-text">
                  <h2 style={{ color: "var(--principal)" }}>{card.title}</h2>
                  <h5 style={{ color: "var(--secundario)" }}>{card.text}</h5>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="mini-cards-wrapper">
          {featuredCards.map((card, index) => renderMiniCard(card, index))}
        </div>
      </Container>

      <div style={{ backgroundColor: "var(--fondo)", padding: "3rem 0" }}>
        <Container className="my-5">
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
                <Link
                  to={`/producto/${product.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Card className="text-center shadow home-card">
                    <Card.Img variant="top" src={product.image_url} />
                    <Card.Body>
                      <Card.Title style={{ color: "var(--principal)" }}>
                        {product.nombre}
                      </Card.Title>
                      <Card.Text style={{ color: "var(--secundario)" }}>
                        {product.descripcion}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
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
