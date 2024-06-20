import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm, useFieldArray } from "react-hook-form";
import { URL_PRO_add, URL_PRO_list } from "../url/url";
import "./productcc.css";

const Product = () => {
  const [productList, setProductList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: {
      name: "",
      Malayalam: "",
      Tamil: "",
      Scale: "",
      Price: "",
      gstpre: "",
      pagprice: "",
      Wages: "",
      commission: "",
      category: "",
      entries: [
        {
          serialNumber: "",
          date: "",
          patchNumber: "",
        },
      ],
      StockQunity: "",
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "entries",
  });

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(URL_PRO_list);
      setProductList(res.data);
    } catch (error) {
      console.error("Error fetching product list:", error);
    }
  };

  const categories = ["Liews"];

  const openModal = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onSubmit = async (data) => {
    try {
      await axios.post(URL_PRO_add, data);
      fetchProduct();
      closeModal();
      reset();
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
            <th className="desktop-view">Malayalam name</th>
            <th className="desktop-view">Tamil name</th>
            <th>Scale</th>
            <th>Price</th>
            <th>gstpre</th>
            <th>Cgst</th>
            <th>Sgst</th>
            <th>pagprice</th>
            <th>Wages</th>
            <th>commission</th>
            <th>category</th>
            <th>Stock Qunity</th>
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
              <td>{product.gstpre}</td>
              <td>{product.cgst}</td>
              <td>{product.sgst}</td>
              <td>{product.pagprice}</td>
              <td>{product.Wages}</td>
              <td>{product.commission}</td>
              <td>{product.category}</td>
              <td>{product.StockQunity}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>Add Product</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <table>
                <tr key=""></tr>
              </table>
              <div>
                <p>Product Name:</p>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  {...register("name")}
                />
              </div>
              <div>
                <p>Malayalam Name:</p>
                <input
                  type="text"
                  name="Malayalam"
                  placeholder="Malayalam Name"
                  {...register("Malayalam")}
                />
              </div>
              <div>
                <p>Tamil Name:</p>
                <input
                  type="text"
                  name="Tamil"
                  placeholder="Tamil Name"
                  {...register("Tamil")}
                />
              </div>
              <div>
                <p>Scale:</p>
                <input
                  type="text"
                  name="Scale"
                  placeholder="Scale"
                  {...register("Scale")}
                />
              </div>
              <div>
                <p>Price:</p>
                <input
                  type="text"
                  name="Price"
                  placeholder="Price"
                  {...register("Price")}
                />
              </div>
              <div>
                <p>gstpre:</p>
                <input
                  type="text"
                  name="gstpre"
                  placeholder="gstpre"
                  {...register("gstpre")}
                />
              </div>
              <div>
                <p>Cgst:</p>
                <input
                  type="text"
                  name="cgst"
                  placeholder="cgst"
                  {...register("cgst")}
                />
              </div>
              <div>
                <p>Sgst:</p>
                <input
                  type="text"
                  name="sgst"
                  placeholder="sgst"
                  {...register("sgst")}
                />
              </div>
              <div>
                <p>pagprice:</p>
                <input
                  type="text"
                  name="pagprice"
                  placeholder="pagprice"
                  {...register("pagprice")}
                />
              </div>
              <div>
                <p>Wages:</p>
                <input
                  type="text"
                  name="Wages"
                  placeholder="Wages"
                  {...register("Wages")}
                />
              </div>
              <div>
                <p>commission:</p>
                <input
                  type="text"
                  name="commission"
                  placeholder="commission"
                  {...register("commission")}
                />
              </div>
              <div>
                <p>Category:</p>
                <select name="category" {...register("category")}>
                  <option value="">Select a category</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <p>Entries:</p>
                {fields.map((entry, index) => (
                  <div key={entry.id} className="entry">
                    <div>
                      <p>Serial Number:</p>
                      <input
                        type="text"
                        placeholder="Serial Number"
                        {...register(`entries.${index}.serialNumber`)}
                      />
                    </div>
                    <div>
                      <p>Date:</p>
                      <input
                        type="text"
                        placeholder="Date"
                        {...register(`entries.${index}.date`)}
                      />
                    </div>
                    <div>
                      <p>Patch Number:</p>
                      <input
                        type="text"
                        placeholder="Patch Number"
                        {...register(`entries.${index}.patchNumber`)}
                      />
                    </div>
                    <button type="button" onClick={() => remove(index)}>
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    append({ serialNumber: "", date: "", patchNumber: "" })
                  }
                >
                  Add Entry
                </button>
              </div>
              <div>
                <p>pagprice:</p>
                <input
                  type="text"
                  name="StockQunity"
                  placeholder="StockQunity"
                  {...register("StockQunity")}
                />
              </div>

              <button type="submit">Add Product</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Product;
