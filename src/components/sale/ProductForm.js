import React, { useEffect, useState, useRef } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import axios from "axios";
import { FaBeer, FaEye, FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import OrderByProduct from "./OrderByProduct";
import "./ProductForm.css";
import {
  URL_ORD_update,
  URL_ORD_list,
  URL_ORD_select,
  URL_ORD_add,
  URL_PRO_list,
} from "../url/url";
import OrderPrintPre from "./orderPrintPre";

const test =
  "https://ap-south-1.aws.data.mongodb-api.com/app/data-muggu/endpoint/testing";

const ProductForm = () => {
  const [formEdited, setFormEdited] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectid, setSelectid] = useState("");
  const quantityInputRefs = useRef([]);

  // save selecred order object list by this
  const [selectedOrder, SetselectedOrder] = useState("");
  // Print prew modal  enable
  const [showOrderPrintPreModal, setshowOrderPrintPreModal] = useState(false);
  // order by product modal  enable
  const [showOrderByProduct, setshowOrderByProduct] = useState(false);
  //usesate for selectbox
  const [selectedRows, setSelectedRows] = useState([]);

  //product data list
  const [productList, setProductList] = useState([]);

  const { register, control, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      customer: { name: "" },
      bill_details: {
        date: "",
        bill_date: "",
        bill_amout: "",
        total_qunitity: "",
        transport: "",
        cash: "",
        crdit: "",
      },
      products: [
        { name: "", quantity: "", single_price: "", scale: "", price: "" },
      ],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "products",
  });

  const onAddProduct = () => {
    append({ name: "", quantity: "", single_price: "", scale: "", price: "" });
  };

  const onSubmit = async (data) => {
    try {
      const requestData = {
        customer: data.customer,
        products: data.products,
        bill_details: data.bill_details,
      };

      let response;
      if (editMode) {
        // response = await axios.post(URL_ORD_add, requestData);
        console.log(requestData.id);
        // Function to send the POST request with ObjectId and form data
        async function sendDataToRealm(arg1, formData) {
          console.log(arg1);
          console.log(formData);
          try {
            // Construct the payload with ObjectId and form data
            const payload = {
              arg1: arg1,
              formData: formData,
            };

            // Make a POST request to the MongoDB Realm function endpoint
            const response = await axios.post(
              // `${URL_ORD_update}?arg1=${arg1}`,payload);
              URL_ORD_update,
              payload
            );

            // Log the response from the MongoDB Realm function
            console.log("Response:", response.data);
          } catch (error) {
            console.error(
              "Error:",
              error.response ? error.response.data : error.message
            );
          }
        }

        // Call the function to send data to MongoDB Realm
        sendDataToRealm(selectid, requestData);

        console.log("edit mode");
      } else {
        response = await axios.post(URL_ORD_add, requestData);
        console.log("new mode");
      }

      console.log("Server Response:", response.data);

      setFormEdited(false);
      setEditMode(false);
    } catch (error) {
      console.error("Error while submitting data:", error);
    }
  };

  const [list, setCuslist] = useState([]);

  useEffect(() => {
    cus_get_list();
  }, []);

  const cus_get_list = async () => {
    try {
      const res = await axios.get(URL_ORD_list);
      setCuslist(res.data);
    } catch (error) {
      console.error("Error fetching customer list:", error);
    }
  };

  const editbill = async (id) => {
    try {
      const res = await axios.get(`${test}?arg1=${id}`);
      const { customer, products, bill_details } = res.data;

      reset({ customer, products, bill_details });

      setFormEdited(true);
      setEditMode(true);
      setSelectid(id);
    } catch (error) {
      console.error("Error fetching customer list:", error);
    }
  };

  useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0];
    setValue("bill_details.date", currentDate);
    setValue("bill_details.bill_date", currentDate);
  }, [setValue]);

  const handleReset = () => {
    // Reset form fields to default values
    reset({
      customer: { name: "" },
      bill_details: {
        date: "",
        bill_date: "",
        bill_amout: "",
        total_qunitity: "",
        transport: "",
        cash: "",
        crdit: "",
      },
      products: [
        { name: "", quantity: "", single_price: "", scale: "", price: "" },
      ],
    });

    // Reset form edit mode
    setFormEdited(false);
    setEditMode(false);
  };

  const closeModal = () => {
    setshowOrderPrintPreModal(false);
    setshowOrderByProduct(false);
    setSelectid(null);
  };

  const handlePrintPre = (order) => {
    SetselectedOrder(order);
    setshowOrderPrintPreModal(true);
  };
  //select all box button options
  const handleRowSelection = (index) => {
    const selectedIndex = selectedRows.indexOf(index);
    let newSelectedRows = [];

    if (selectedIndex === -1) {
      // Add the row to the selection
      newSelectedRows = [...selectedRows, index];
    } else {
      // Remove the row from the selection
      selectedRows.splice(selectedIndex, 1);
      newSelectedRows = [...selectedRows];
    }

    setSelectedRows(newSelectedRows);
  };

  const handleSelectAll = () => {
    if (selectedRows.length === list.length) {
      setSelectedRows([]);
    } else {
      const allIndices = Array.from({ length: list.length }, (_, i) => i);
      setSelectedRows(allIndices);
    }
  };

  //view modal order by product
  const handleOrderbyProduct = () => {
    setshowOrderByProduct(true);
  };

  //product data list

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

  //  price auto fill
  const handleProductSelection = (productName, index) => {
    // Find the selected product from the product list
    const selectedProduct = productList.find(
      (product) => product.name === productName
    );
    // Update the single price field with the price of the selected product
    if (selectedProduct) {
      console.log(selectedProduct.Price);
      setValue(`products.${index}.single_price`, selectedProduct.Price);
      setValue(`products.${index}.scale`, selectedProduct.Scale);

      if (quantityInputRefs.current[index]) {
        quantityInputRefs.current[index].focus();
      }
    } else {
      // Handle case where selected product is not found
      console.error(`Product with name not found.`);
      // Optionally, you can provide a default value or perform other actions
    }
  };

  return (
    <div className="row">
      <div className="col-sm-9">
        <form onSubmit={handleSubmit(onSubmit)}>
          <br />
          <div className="row">
            <div className="col-6">
              <div>
                <label>Customer Name:</label>
                <input
                  {...register("customer.name")}
                  placeholder="Customer Name"
                />
              </div>
            </div>
            <div className="col-6">
              <table>
                <tbody>
                  <tr>
                    <th>Date:</th>
                    <th>
                      <input
                        {...register("bill_details.date")}
                        type="date"
                        readOnly
                      />
                    </th>
                  </tr>
                  <tr>
                    <th>To Date:</th>
                    <th>
                      {" "}
                      <input
                        {...register("bill_details.bill_date")}
                        type="date"
                      />
                    </th>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <hr />
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Single Price</th>
                  <th>Scale</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {fields.map((item, index) => (
                  <tr key={item.id}>
                    <td>
                      <input
                        {...register(`products.${index}.name`)}
                        placeholder="Product Name"
                        list="productSuggestions"
                        onChange={(e) =>
                          handleProductSelection(e.target.value, index)
                        }
                      />

                      <datalist id="productSuggestions">
                        {productList.map((product, index) => (
                          <option key={index} value={product.name} />
                        ))}
                      </datalist>
                    </td>
                    <td>
                      <input
                        {...register(`products.${index}.quantity`)}
                        placeholder="Quantity"
                        type="number"
                        ref={(el) => (quantityInputRefs.current[index] = el)}
                        className="smallInput" // Assigning the ref here
                      />
                    </td>
                    <td>
                      <input
                        {...register(`products.${index}.single_price`)}
                        placeholder="Single Price"
                        type="number"
                        className="smallInput"
                      />
                    </td>
                    <td>
                      <input
                        {...register(`products.${index}.scale`)}
                        placeholder="Scale"
                        type="text"
                        className="mediumInput"
                      />
                    </td>
                    <td>
                      <input
                        {...register(`products.${index}.price`)}
                        placeholder="Price"
                        type="number"
                        className="smallInput"
                      />
                    </td>
                    <td>
                      <button type="button" onClick={() => remove(index)}>
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button type="button" onClick={onAddProduct}>
            Add Product
          </button>
          <br />
          <br />
          <hr />
          <div className="row">
            <div className="col-sm-6">
              <table>
                <tbody>
                  <tr>
                    <th>total_qunitity:</th>
                    <td>
                      {" "}
                      <input {...register("bill_details.total_qunitity")} />
                    </td>
                  </tr>
                  <tr>
                    <th>Trensport:</th>
                    <td>
                      <input {...register("bill_details.transport")} />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="col-sm-6">
              <table>
                <tbody>
                  <tr>
                    <th>
                      <label>cash:</label>
                    </th>
                    <td>
                      {" "}
                      <input {...register("bill_details.cash")} />
                    </td>
                  </tr>
                  <tr>
                    <th>crdit:</th>
                    <td>
                      <input {...register("bill_details.crdit")} />
                    </td>
                  </tr>
                  <tr>
                    <th>Total Amout:</th>
                    <td>
                      {" "}
                      <input {...register("bill_details.bill_amout")} />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <button type="submit">{editMode ? "Update" : "Submit"}</button>
          <button type="button" onClick={handleReset}>
            Reset
          </button>
        </form>
      </div>
      <div className="col-sm-3">
        <div style={{ height: "600px", overflow: "scroll", display: "block" }}>
          <input type="datec" />
          <h3>Order List</h3>
          <table>
            <thead>
              <tr>
                <th>
                  <input
                    style={{ width: "30px" }}
                    type="checkbox"
                    checked={selectedRows.length === list.length}
                    onChange={handleSelectAll}
                  />
                </th>
                <th>S.No</th>
                <th>Name</th>
                <th>View</th>
                <th>edit</th>
                <th>det</th>
              </tr>
            </thead>
            <tbody>
              {list.map((customer, index) => (
                <tr key={index}>
                  <td>
                    <input
                      style={{ width: "30px" }}
                      type="checkbox"
                      checked={selectedRows.includes(index)}
                      onChange={() => handleRowSelection(index)}
                    />
                  </td>
                  <td>{index + 1}</td>
                  <td>{customer.customer.name}</td>
                  <td style={{ cursor: "pointer" }}>
                    <a onClick={() => handlePrintPre(customer)}>
                      <FaEye />
                    </a>
                  </td>
                  <td>
                    <button onClick={() => editbill(customer._id)}>
                      <FaRegEdit />
                    </button>
                  </td>
                  <td>
                    <a>
                      <MdDeleteOutline />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <a href="" disabled={selectedRows.length === 0}>
            Select all Print
          </a>
          <a href="">Select all delete</a>
          <a href="">Select all sale convert</a>
          <a onClick={() => handleOrderbyProduct()}>select all prews</a>
        </div>
      </div>

      {showOrderPrintPreModal && (
        <OrderPrintPre selectedOrder={selectedOrder} closeModal={closeModal} />
      )}
      {showOrderByProduct && <OrderByProduct closeModal={closeModal} />}
    </div>
  );
};

export default ProductForm;
