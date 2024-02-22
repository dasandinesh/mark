import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import NavComponent from "./components/navbar/nav";
import ProductForm from "./components/sale/ProductForm";
import React from "react";
import Product from "./components/product/product";
import AddProduct from "./components/product/addproduct";
import SaleEntry from "./components/sale/saleEntry";
import Customer from "./components/coustomer/coustomer";

function App() {
  return (
    <React.StrictMode>
      <NavComponent />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/order" element={<Order />} /> */}
          <Route path="/ProductForm" element={<ProductForm />} />
          <Route path="/product" element={<Product />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/saleEntry" element={<SaleEntry />} />
          <Route path="/coustomer" element={<Customer />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;
