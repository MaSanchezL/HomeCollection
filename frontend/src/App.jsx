import Header from './components/Header';
import Footer from './components/Footer';
import Home from './views/Home';
import CardProduct from './components/CardProduct';
import CrearProducto from './views/CrearProducto';
import GaleriaProductos from './views/GaleriaProductos';
import CardProductGaleria from './components/CardProductGaleria.jsx';
import AppRoutes from './components/AppRoutes.jsx';


function App() {
 const object = {
    id: 3,
    nombre: "Auriculares Inalámbricos",
    precio: 149.9,
    imagen: "https://placehold.co/300x200",
    descripcion:
      "Auriculares bluetooth con cancelación activa de ruido y estuche de carga.",
  };
  return (
    <>
      <div
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Header />
        {/*<main style={{ flexGrow: 1 }}>
          <Home />
        </main>*/}
        <AppRoutes/>
        {/*<CardProduct {...object} />*/}
        {/*<CrearProducto/>*/}
        {/*<GaleriaProductos/>*/}
        {/*<CardProductGaleria {...object} />*/}


        <Footer />
      </div>
    </>
  );
}

export default App;