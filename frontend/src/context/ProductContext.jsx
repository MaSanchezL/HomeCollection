import { createContext, useState, useEffect } from "react";

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [countProducts, setCountProducts] = useState(0);
  const [data, setData] = useState([]);

  const url = "https://fakestoreapi.com/products";

  const getData = async () => {
    const response = await fetch(url);
    const data = await response.json();
    setData(data);
  };
  useEffect(() => {
    getData();
  }, []);

  const onAddProduct = (product) => {
    if (allProducts.find((item) => item.id === product.id)) {
      const products = allProducts.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setTotal(total + product.price * product.quantity);
      setCountProducts(countProducts + product.quantity);
      return setAllProducts([...products]);
    }

    setTotal(total + product.price * product.quantity);
    setCountProducts(countProducts + product.quantity);
    setAllProducts([...allProducts, product]);
  };
  const onDeleteProduct = (product) => {
    const results = allProducts.filter((item) => item.id !== product.id);

    setTotal(total - product.price * product.quantity);
    setCountProducts(countProducts - product.quantity);
    setAllProducts(results);
  };
  const onCleanCart = () => {
    setAllProducts([]);
    setTotal(0);
    setCountProducts(0);
  };

  return (
    <>
      <ProductContext.Provider
        value={{
          allProducts,
          setAllProducts,
          total,
          setTotal,
          countProducts,
          setCountProducts,
          data,
          setData,
          onAddProduct,
          onDeleteProduct,
          onCleanCart,
        }}
      >
        {children}
      </ProductContext.Provider>
    </>
  );
};
export default ProductProvider;
