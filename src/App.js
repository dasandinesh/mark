import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import React, { useState } from "react";
import Navbar from "./components/navbar/navpar";
import Customer from "./components/customer/customer";
import Orderform from "./components/order/orderform";
// import ProductForm from "./components/sale/ProductForm";
import Product from "./components/product/product";
import AddProduct from "./components/product/addproduct";
import OrderPrintPre from "./components/order/orderPrintPre";
import SaleEntry from "./components/sale/saleentry";
// import Customer from "./components/coustomer/coustomer";
import Ledger from "./components/accounts/ledger";
import ReceiptEntry from "./components/accounts/recept_entry";
import ReceipList from "./components/accounts/receipt";
import ExpenseList from "./components/accounts/ExpenseList";
import PurchaseEntry from "./components/purchase/purchaseentry";
import Purchasemenu from "./components/setting/Purchasemenu";
import SaleGstEntry from "./components/salegst/Salegstentry";
import LastBill from "./components/sale/LastBill";
import BranchList from "./components/company/BranchList";
import CompanyList from "./components/company/CompanyList";
import UserList from "./components/user/UserList";
import Test from "./components/accounts/test";
import Test2 from "./components/accounts/test2";
function App() {
  // State to hold the selected order
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Function to set selected order
  const handleSelectOrder = (order) => {
    setSelectedOrder(order);
  };

  return (
    <React.StrictMode>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/order"
            element={<Orderform onSelectOrder={handleSelectOrder} />}
          />
          <Route path="/saleentry" element={<SaleEntry />} />
          <Route path="/product" element={<Product />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/Ledger" element={<Ledger />} />
          <Route path="/receiptentry" element={<ReceiptEntry />} />
          <Route path="/receipt" element={<ReceipList />} />
          <Route path="/ExpenseList" element={<ExpenseList />} />
          <Route path="/PurchaseEntry" element={<PurchaseEntry />} />
          <Route path="/Purchasemenu" element={<Purchasemenu />} />
          <Route path="/SaleGstEntry" element={<SaleGstEntry />} />
          <Route path="/LastBill" element={<LastBill />} />
          <Route path="/company" element={<CompanyList />} />
          <Route path="/branch" element={<BranchList />} />
          <Route path="/userlist" element={<UserList />} />
          <Route path="/test" element={<Test />} />
          <Route path="/test2" element={<Test2 />} />

          <Route
            path="/orderprint"
            element={<OrderPrintPre selectedOrder={selectedOrder} />}
          />
          {/* <Route path="/saleEntry" element={<SaleEntry />} />
          <Route path="/coustomer" element={<Customer />} /> */}
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;
