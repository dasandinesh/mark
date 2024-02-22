import React, { useState, useEffect } from "react";
import axios from "axios";
import { URL_PRO, URL_PRO_add } from "../url/url";

const Customer = () => {
  const [coustomerList, setCoustomerList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCoustomer, setnewCoustomer] = useState({
    name: "",
    PhoneNo: "",
    CreateDate: "",
    CoustomerType: "",
    gmail: "",
    addressdoorno: "",
    addressstreet: "",
    Area: "",
    addresssdistrict: "",
    pincode: "",
  });

  useEffect(() => {
    fetchProduct();
  }, []);

  useEffect(() => {
    console.log("isModalOpen:", isModalOpen);
  }, [isModalOpen]);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(URL_PRO_add);
      setCoustomerList(res.data);
    } catch (error) {
      console.error("Error fetching product list:", error);
    }
  };

  const openModal = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setnewCoustomer({
      ...newCoustomer,
      [name]: value,
    });
  };

  const addProduct = async () => {
    try {
      await axios.post(URL_PRO_add, newCoustomer);
      fetchProduct();
      closeModal();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <>
      <h3>coustomer List</h3>
      <div className="row">
        <div className="col-6">
          <label>Search Coustomer</label>
          <input type="text" />
        </div>
        <div className="col-6">
          <button onClick={openModal}>Add</button>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>S.no</th>
            <th>Name</th>
            <th>Phone NO</th>
            <th>Area</th>
            <th>Credit</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {coustomerList.map((coustomer, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{coustomer.name}</td>
              <td>{coustomer.PhoneNo}</td>
              <td>{coustomer.CoustomerType}</td>
              <td>{coustomer.Area}</td>
              <td>{coustomer.addresssdistrict}</td>
              <td>
                {/* Buttons for handling edit and views */}
                {/* <button onClick={() => handleEdit(product)}>&#xf044;</button> */}
                {/* <button onClick={() => handleViews(product)}>Views</button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for adding a new product */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>Add Coustomer</h2>
            <form onSubmit={addProduct}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={newCoustomer.name}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="PhoneNo"
                placeholder="Phone no"
                value={newCoustomer.PhoneNo}
                onChange={handleInputChange}
              />
              <input
                type="date"
                name="CreateDate"
                placeholder="CreateDate"
                value={newCoustomer.CreateDate}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="CoustomerType"
                placeholder="Coustomer Type"
                value={newCoustomer.CoustomerType}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="gmail"
                placeholder="gmail"
                value={newCoustomer.gmail}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="addressdoorno"
                placeholder="addressdoorno"
                value={newCoustomer.addressdoorno}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="addressstreet"
                placeholder="addressstreet"
                value={newCoustomer.addressstreet}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="Area"
                placeholder="Area"
                value={newCoustomer.Area}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="addresssdistrict"
                placeholder="addresssdistrict"
                value={newCoustomer.addresssdistrict}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="pincode"
                placeholder="pincode"
                value={newCoustomer.pincode}
                onChange={handleInputChange}
              />
              <button type="submit">Add Product</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Customer;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { URL_PRO } from "../url/url";

// const Product = () => {
//   const [productList, setProductList] = useState([]);

//   useEffect(() => {
//     fetchProduct();
//   }, []);

//   const fetchProduct = async () => {
//     try {
//       const res = await axios.get(URL_PRO);
//       setProductList(res.data);
//     } catch (error) {
//       console.error("Error fetching product list:", error);
//     }
//   };

//   return (
//     <>
//       <h3>Product List</h3>
//       <div className="row">
//         <div className="col-6">
//           <label>Search product</label>
//           <input type="text" />
//         </div>
//         <div className="col-6">
//           <a href="/addproduct">Add </a>
//         </div>
//       </div>
//       <table>
//         <thead>
//           <tr>
//             <th>S.no</th>
//             <th>Name</th>
//             <th>Malayalam name</th>
//             <th>Tamil name</th>
//             <th>Scale</th>
//             <th>Price</th>
//             <th></th>
//             <th></th>
//           </tr>
//         </thead>
//         <tbody>
//           {productList.map((product, index) => (
//             <tr key={index}>
//               <td>{index + 1}</td>
//               <td>{product.name}</td>
//               <td>{product.Malayalam}</td>
//               <td>{product.Tamil}</td>
//               <td>{product.Scale}</td>
//               <td>{product.Price}</td>
//               <td>
//                 {/* Buttons for handling edit and views */}
//                 {/* <button onClick={() => handleEdit(product)}>&#xf044;</button> */}
//                 {/* <button onClick={() => handleViews(product)}>Views</button> */}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </>
//   );
// };

// export default Product;
