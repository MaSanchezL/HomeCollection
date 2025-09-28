import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container } from "react-bootstrap";
import { useState } from "react";
import "../assets/css/CrearProducto.css";
import { useNavigate } from "react-router-dom";

const CrearProducto = () => {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const [imagen, setImagen] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const validarInput = async (e) => {
    e.preventDefault();

    if (
      !nombre.trim() ||
      !precio.trim() ||
      !stock.trim() ||
      !imagen.trim() ||
      !descripcion.trim()
    ) {
      alert("Todos los campos son obligatorios");
      return;
    }

    const nuevoProducto = {
      nombre,
      precio: Number(precio),
      stock: Number(stock),
      imagen,
      descripcion,
    };

    try {
      const res = await fetch("http://localhost:3000/api/products/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoProducto),
      });

      if (!res.ok)
        throw new Error(data.message || "Error al crear el producto");

      const data = await res.json();

      alert("Producto creado correctamente");

      if (data.id) {
        navigate(`/producto/${data.id}`);
      }

      setNombre("");
      setPrecio("");
      setStock("");
      setImagen("");
      setDescripcion("");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Container className="my-4 p-4">
      <h2 className="titulo">CREAR PRODUCTO</h2>
      <Form onSubmit={validarInput} className="form">
        <Form.Group className="mb-3 fw-bold" controlId="">
          <Form.Label>Nombre del producto</Form.Label>
          <Form.Control
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ingrese nombre del producto"
          />
        </Form.Group>

        <Form.Group className="mb-3 fw-bold" controlId="">
          <Form.Label>Precio</Form.Label>
          <Form.Control
            type="number"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            placeholder="Ingrese precio del producto"
          />
        </Form.Group>

        <Form.Group className="mb-3 fw-bold" controlId="">
          <Form.Label>Stock</Form.Label>
          <Form.Control
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            placeholder="Ingrese stock de producto"
          />
        </Form.Group>

        <Form.Group className="mb-3 fw-bold" controlId="">
          <Form.Label>Imagen del Producto</Form.Label>
          <Form.Control
            type="text"
            value={imagen}
            onChange={(e) => setImagen(e.target.value)}
            placeholder="Ingrese url de la imagen del producto"
          />
        </Form.Group>

        <Form.Group className="mb-3 fw-bold" controlId="">
          <Form.Label>Descripción del Producto</Form.Label>
          <Form.Control
            type="text"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Ingrese una descripción del Producto"
          />
        </Form.Group>

        <div className="text-center">
          <Button
            variant="primary"
            type="submit"
            size="lg"
            style={{ width: "250px" }}
          >
            Publicar producto
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default CrearProducto;
