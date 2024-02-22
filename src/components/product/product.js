import React, { useState, useEffect } from "react";
import axios from "axios";
import { URL_PRO_add, URL_PRO_list } from "../url/url";
import "./productcc.css";
const Product = () => {
  const [productList, setProductList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    Malayalam: "",
    Tamil: "",
    Scale: "",
    Price: "",
  });

  useEffect(() => {
    fetchProduct();
  }, []);

  useEffect(() => {
    console.log("isModalOpen:", isModalOpen);
  }, [isModalOpen]);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(URL_PRO_list);
      setProductList(res.data);
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
    setNewProduct({
      ...newProduct,
      [name]: value,
    });
  };

  const addProduct = async () => {
    try {
      await axios.post(URL_PRO_add, newProduct);
      fetchProduct();
      closeModal();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <>
      <h3>Product List</h3>
      <div className="row">
        <div className="col-6">
          <label>Search product</label>
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
            <th>Malayalam name</th>
            <th>Tamil name</th>
            <th>Scale</th>
            <th>Price</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {productList.map((product, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{product.name}</td>
              <td>{product.Malayalam}</td>
              <td>{product.Tamil}</td>
              <td>{product.Scale}</td>
              <td>{product.Price}</td>
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
            <h2>Add Product</h2>
            <form onSubmit={addProduct}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={newProduct.name}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="Malayalam"
                placeholder="Malayalam Name"
                value={newProduct.Malayalam}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="Tamil"
                placeholder="Tamil Name"
                value={newProduct.Tamil}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="Scale"
                placeholder="Scale"
                value={newProduct.Scale}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="Price"
                placeholder="Price"
                value={newProduct.Price}
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

export default Product;

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
