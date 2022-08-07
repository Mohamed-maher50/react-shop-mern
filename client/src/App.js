import React, { useContext, useState } from "react";
import { Routes, BrowserRouter, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import AuthContext from "./context/AuthContext";
import CreateProduct from "./pages/Actions/CreateProduct";
import Home from "./pages/Home/Home";
import Login from "./pages/Login";
import Products from "./pages/Products.js/Products";
import Register from "./pages/Register";

import DeleteProduct from "./pages/Actions/DeleteProduct";
import CheckProduct from "./pages/checkProduct/CheckProduct";
import Cart from "./pages/cart/Cart";
function App() {
  const { logedin, isAdmin } = useContext(AuthContext);

  return (
    <div className="App ">
      <BrowserRouter>
        <Navbar />

        <Routes>
          {logedin ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/checkProduct/:id" element={<CheckProduct />} />
              <Route path="/cart" element={<Cart />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Home />} />

              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </>
          )}
          {isAdmin ? (
            <>
              <Route path="/createProducts" element={<CreateProduct />} />
              <Route path="/deleteProducts" element={<DeleteProduct />} />
            </>
          ) : (
            ""
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
