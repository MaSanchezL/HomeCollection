import { createContext, useState, useEffect, useContext } from "react";
import { UserContext } from "./UserContext";
import CheckoutSuccess from "../views/CheckoutSuccess";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { user } = useContext(UserContext);
  const [orderId, setOrderId] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {}, [cart]);

  const agregarProducto = (producto) => {
    const productoId = cart.find((e) => e.id === producto.id);
    if (productoId) {
      setCart(
        cart.map((productoCart) => {
          if (productoCart.id === producto.id) {
            let suma = productoCart.count + 1;
            return { ...productoCart, count: suma };
          }
          return productoCart;
        })
      );
    } else {
      setCart([...cart, { ...producto, count: 1 }]);
    }
  };
  const agregarProductos = (producto, cantidad) => {
    const productoId = cart.find((e) => e.id === producto.id);
    if (productoId) {
      setCart(
        cart.map((productoCart) => {
          if (productoCart.id === producto.id) {
            let suma = productoCart.count + cantidad;
            return { ...productoCart, count: suma };
          }
          return productoCart;
        })
      );
    } else {
      setCart([...cart, { ...producto, count: cantidad }]);
    }
  };
  const quitarProducto = (producto) => {
    setCart(
      cart
        .map((productoCart) => {
          if (productoCart.id === producto.id) {
            let resta = productoCart.count - 1;
            return { ...productoCart, count: resta };
          }
          return productoCart;
        })
        .filter((productoCart) => productoCart.count > 0)
    );
  };
  const quitarProductos = (producto, cantidad) => {
    setCart(
      cart
        .map((productoCart) => {
          if (productoCart.id === producto.id) {
            let resta = productoCart.count - cantidad;
            return { ...productoCart, count: resta };
          }
          return productoCart;
        })
        .filter((productoCart) => productoCart.count > 0)
    );
  };

  const totalProducts = cart.reduce((acumulador, productoCart) => {
    return acumulador + productoCart.count;
  }, 0);
  const totalPrice = cart.reduce((acumulador, productoCart) => {
    return acumulador + productoCart.precio * productoCart.count;
  }, 0);

  const clearCart = () => {
    setCart([]);
  };

  const checkout = async () => {
    if (!user || !user.token) {
      return {
        success: false,
        message: "Usuario debe estar registrado para finalizar la compra",
      };
    }

    const orderData = {
      total_amount: totalPrice,
      items: cart.map((item) => ({
        product_id: item.id,
        quantity: item.count,
        price: item.precio,
      })),
    };

    try {
      const res = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(orderData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Error al crear la orden");
      }

      return { success: true, order: data };
    } catch (error) {
      console.error("Error al finalizar la compra:", error);
      return { success: false, message: error.message || "Error de conexión" };
    }
  };

      return { success: true, order: data };
    } catch (error) {
      console.error("Error al finalizar la compra:", error);
      return { success: false, message: error.message || "Error de conexión" };
    }
  };
  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        agregarProducto,
        agregarProductos,
        quitarProducto,
        quitarProductos,
        totalPrice,
        totalProducts,
        clearCart,
        checkout,
        orderId,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
export default CartProvider;
