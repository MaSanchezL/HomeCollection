import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    console.log("ver lo que cart en el contexto", cart);
  }, [cart]);

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
  const total = cart.reduce((acumulador, productoCart) => {
    return acumulador + productoCart.precio * productoCart.count;
  }, 0);
  const totalProducts = cart.reduce((acumulador, productoCart) => {
    return acumulador + productoCart.count;
  }, 0);
  const totalPrice = cart.reduce((acumulador, productoCart) => {
    return acumulador + productoCart.precio * productoCart.count;
  }, 0);

  const clearCart = () => {
    setCart([]);
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
        total,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
export default CartProvider;
