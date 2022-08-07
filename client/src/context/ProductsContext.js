import React, { useState, useEffect } from "react";
import { createContext } from "react";
import axios from "axios";

const ProductsContext = createContext();
function ProductsProvider(props) {
  const [product, SetProduct] = useState([]);
  const getProducts = async () => {
    const products = await axios.get("http://localhost:5000/products");
    SetProduct(products.data);
  };
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <>
      <ProductsContext.Provider value={product}>
        {props.children}
      </ProductsContext.Provider>
    </>
  );
}

export default ProductsContext;
export { ProductsProvider };
