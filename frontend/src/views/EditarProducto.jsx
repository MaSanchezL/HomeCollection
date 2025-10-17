import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container } from "react-bootstrap";
import { useContext, useState } from "react";
import "../assets/css/EditarProducto.css";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL;

const EditarProducto = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const { user } = useContext(UserContext);

  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [imagen, setImagen] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categoria, setCategoria] = useState("");

  const getProducyById = async () => {
    try {
      const res = await fetch(`${API_URL}/products/${id}`);

      const data = await res.json();
      setNombre(data.nombre);
      setPrecio(data.precio);
      setImagen(data.image_url);
      setDescripcion(data.descripcion);
    } catch (error) {
      alert(error.message);
    }
  };

  const deleteProduct = async () => {
    try {
      const res = await fetch(`${API_URL}/products/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await res.json();
      alert(data.status);

      navigate(`/galeria`);
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    getProducyById();
  }, [id]);

  const validarInput = async (e) => {
    e.preventDefault();
    console.log(typeof precio);
    if (
      !nombre.trim() ||
      !precio.toString().trim() ||
      !imagen.trim() ||
      !descripcion.trim() ||
      !categoria.trim()
    ) {
      alert("Todos los campos son obligatorios");
      return;
    }

    const productoEditado = {
      id: id,
      nombre,
      precio: Number(precio),
      imagen,
      descripcion,
      categoria_id: categoria,
    };

    try {
      const res = await fetch(`${API_URL}/products/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(productoEditado),
      });

      if (!res.ok)
        throw new Error(data.message || "Error al editar el producto");

      const data = await res.json();

      alert("Producto editado correctamente");

      if (data.id) {
        navigate(`/producto/${data.id}`);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Container className="my-4 p-4">
      <h2 className="titulo">EDITAR PRODUCTO</h2>
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
            <option value="1">Electrodomésticos</option>
            <option value="2">Cocina</option>
            <option value="3">Muebles</option>
          </Form.Select>
        </Form.Group>

        <div className="botones">
          <Button
            className="publicar"
            variant="primary"
            type="submit"
            size="lg"
            style={{ width: "250px" }}
          >
            Publicar producto
          </Button>

          <Button
            className="eliminar"
            variant="danger"
            size="lg"
            onClick={deleteProduct}
            style={{ width: "250px" }}
          >
            Eliminar producto
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default EditarProducto;
