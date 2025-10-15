import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container } from "react-bootstrap";
import { useContext, useState } from "react";
import "../assets/css/CrearProducto.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const CrearProducto = () => {
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

  const navigate = useNavigate();

  const{user}=useContext(UserContext);

  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [imagen, setImagen] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categoria, setCategoria] = useState("0");

  const validarInput = async (e) => {
    e.preventDefault();

    if (
      !nombre.trim() ||
      !precio.trim() ||
      !imagen.trim() ||
      !descripcion.trim() ||
      !categoria.trim()
    ) {
      alert("Todos los campos son obligatorios");
      return;
    }

    const nuevoProducto = {
      nombre,
      precio: Number(precio),
      imagen,
      descripcion,
      categoria_id: categoria,
    };

    try {
      const res = await fetch("${API_URL}/products/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}` 
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

        <Form.Group className="mb-3 fw-bold" controlId="">
          <Form.Label>Categoría del Producto</Form.Label>
          <Form.Select
            className="mb-3"
            aria-label="categoria productos"
            onChange={(e) => setCategoria(e.target.value)}
            value={categoria}
          >
            <option value="0">Ingrese la categoria del producto</option>
            <option value="1">Electrodomésticos</option>
            <option value="2">Cocina</option>
            <option value="3">Muebles</option>
          </Form.Select>
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




 
