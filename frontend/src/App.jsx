import Header from "./components/Header";
import Footer from "./components/Footer";
import RouterManager from "./router/RouterManager";
import "./assets/css/index.css";
import CartProvider from "./context/CartContext";

function App() {
  return (
    <CartProvider>
      <div
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Header />

        <main className="content-area">
          <RouterManager />
        </main>

        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;
