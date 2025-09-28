import { createContext, useState } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const totalPrice = cart.reduce((acumulador, productoCart) => {
    return acumulador + productoCart.price * productoCart.count;
  }, 0);

  const totalProducts = cart.reduce((acumulador, productoCart) => {
    return acumulador + productoCart.count;
  }, 0);

  const agregarProducto = (producto, cantidad) => {
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

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        agregarProducto,
        totalPrice,
        totalProducts,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
export default CartProvider;
