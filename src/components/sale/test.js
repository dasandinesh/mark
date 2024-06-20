import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { FaEye, FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import axios from "axios";
import {
  URL_ORD_update,
  URL_ORD_list,
  URL_ORD_add,
  URL_PRO_list,
  URL_getallcustomer,
  get_order_by_date,
} from "../url/url";

const SaleEntry = () => {
  // State variable to hold the filtered order list
  const [filteredOrderList, setFilteredOrderList] = useState([]);

  // Current date
  const [selectedDate, setSelectedDate] = useState("");

  // Second date
  const [selectedSecDate, setSelectedSecDate] = useState("");

  const { register, control, handleSubmit, setValue, reset, getValues } =
    useForm({
      defaultValues: {
        customer: { name: "" },
        bill_details: {
          date: "",
          bill_date: "",
          total_quantity: "",
          transport: "",
          credit: "",
          cash: "",
          bill_amount: "",
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

  useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0];
    setSelectedDate(currentDate);
  }, []);

  useEffect(() => {
    get_order_list_date(selectedDate, selectedSecDate);
  }, [selectedDate, selectedSecDate]);

  const get_order_list_date = async (selectedDate, selectedSecDate) => {
    try {
      const response = await axios.get(get_order_by_date, {
        params: {
          arg1: selectedDate,
          arg2: selectedSecDate,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.data) {
        setFilteredOrderList(response.data);
        console.log(response.data);
      } else {
        console.log("ok");
      }
    } catch (error) {
      console.error("Error fetching order list:", error);
      setFilteredOrderList([]);
    }
  };

  // Handler for date change
  const handleDateChange = (e) => {
    const date = e.target.value;
    setSelectedDate(date);
  };

  const handleSecDateChange = (e) => {
    const date = e.target.value;
    setSelectedSecDate(date);
  };

  return (
    <div className="main row">
      <div className="col-sm-9">
        <form>
          {/* Customer Information */}
          <div className="row">
            <div className="col-6">
              <div>
                <p>Customer Name:</p>
                <input
                  type="text"
                  {...register("customer.name")}
                  placeholder="Customer Name"
                  required
                  list="cusSuggestion"
                />
              </div>
            </div>
            <div className="col-6">
              <div style={{ float: "left", marginRight: "10px" }}>
                <p>Today Date:</p>
                <input
                  type="date"
                  {...register("bill_details.date")}
                  placeholder="Date"
                  readOnly
                  className="date"
                />
              </div>
              <div style={{ float: "left" }}>
                <p>Bill Date:</p>
                <input
                  type="date"
                  {...register("bill_details.bill_date")}
                  placeholder="Bill Date"
                  className="date"
                  required
                />
              </div>
              <div style={{ clear: "both" }}></div> {/* Clear the float */}
            </div>
          </div>
          <br />
          {/* Bill Details */}
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Quantity</th>
                  <th>Single Price</th>
                  <th>Scale</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {fields.map((product, index) => (
                  <tr key={product.id}>
                    <td>
                      <input
                        type="text"
                        {...register(`products.${index}.name`)}
                        placeholder="Product Name"
                        className="mediumInput"
                        required
                        list="productSuggestions"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            // Focus on the next input field
                            const inputs = Array.from(e.target.form.elements);
                            const currentIndex = inputs.indexOf(e.target);
                            let nextIndex = currentIndex + 1;

                            // Skip any fields you want to ignore
                            const skipIndices = [currentIndex]; // Skip the current input field

                            while (skipIndices.includes(nextIndex)) {
                              nextIndex++;
                            }

                            if (nextIndex < inputs.length) {
                              inputs[nextIndex].focus();
                            }
                          }
                        }}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        {...register(`products.${index}.quantity`)}
                        placeholder="Quantity"
                        className="smallInput"
                        required
                        onChange={(e) => {
                          const quantity = parseFloat(e.target.value);
                          const singlePrice = parseFloat(
                            e.target.form[`products.${index}.single_price`]
                              .value
                          ); // Access single_price directly from the form

                          const totalPrice =
                            isNaN(quantity) || isNaN(singlePrice)
                              ? 0
                              : quantity * singlePrice;
                          setValue(
                            `products.${index}.price`,
                            totalPrice.toFixed(2)
                          ); // Round to 2 decimal places
                        }}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        {...register(`products.${index}.single_price`)}
                        placeholder="Single Price"
                        className="smallInput"
                        onChange={(e) => {
                          const singlePrice = parseFloat(e.target.value);
                          const quantity = parseFloat(
                            e.target.form[`products.${index}.quantity`].value
                          ); // Access single_price directly from the form

                          const totalPrice =
                            isNaN(quantity) || isNaN(singlePrice)
                              ? 0
                              : quantity * singlePrice;
                          setValue(
                            `products.${index}.price`,
                            totalPrice.toFixed(2)
                          ); // Round to 2 decimal places
                        }}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        {...register(`products.${index}.scale`)}
                        placeholder="Scale"
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        {...register(`products.${index}.price`)}
                        placeholder="Price"
                        className="smallInput"
                        readOnly
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
          <center>
            <button
              className="buttonb"
              type="button"
              onClick={() =>
                append({
                  name: "",
                  quantity: "",
                  single_price: "",
                  scale: "",
                  price: "",
                })
              }
            >
              Product Add
            </button>
          </center>

          <div className="row">
            <div className="col-md-4 col-6">
              <div>
                <p>Transport:</p>
                <input
                  className="mobilevies"
                  type="text"
                  {...register("bill_details.transport")}
                  placeholder="Transport"
                />
              </div>
              <div>
                <p>Total Quantity:</p>
                <input
                  className="mobilevies"
                  type="number"
                  {...register("bill_details.total_quantity")}
                  placeholder="Total Quantity"
                />
              </div>
            </div>
            <div className="col-md-4 col-6">
              <div>
                <p>Credit</p>
                <input
                  className="mobilevies"
                  type="number"
                  {...register("bill_details.credit")}
                  placeholder="Credit"
                />
              </div>
              <div>
                <p>Cash</p>{" "}
                <input
                  className="mobilevies"
                  type="number"
                  {...register("bill_details.cash")}
                  placeholder="Cash"
                />
              </div>
            </div>
            <div className="col-md-4 col-12">
              <div>
                <p>Bill Amount:</p>
                <input
                  className="mobilevies"
                  type="number"
                  {...register("bill_details.bill_amount")}
                  placeholder="Bill Amount"
                  readOnly
                />
              </div>
            </div>
          </div>
          <center>
            <button className="buttonb" type="submit">
              Submit
            </button>
            <button className="buttonb" type="button" onClick={() => reset()}>
              ADD new
            </button>
          </center>
        </form>
      </div>

      <div className="col-sm-3">
        <div
          style={{
            height: "350px",
            overflow: "scroll",
            display: "block",
          }}
        >
          <h6>Order List</h6>
          <div>
            <div style={{ float: "left", marginRight: "10px" }}>
              <input
                type="date"
                className="date"
                name="date-filter"
                onChange={handleDateChange}
                value={selectedDate}
              />
            </div>
            <div style={{ float: "left", marginRight: "10px" }}>
              <input
                type="date"
                className="date"
                name="date-filter"
                value={selectedSecDate}
                onChange={handleSecDateChange}
              />
            </div>
          </div>
          {Array.isArray(filteredOrderList) && filteredOrderList.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Select</th>
                  <th>#</th>
                  <th>Customer Name</th>
                  <th>View</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrderList.map((customer, index) => (
                  <tr key={index}>
                    <td>
                      <input style={{ width: "30px" }} type="checkbox" />
                    </td>
                    <td>{index + 1}</td>
                    <td>{customer.customer.name}</td>
                    <td style={{ cursor: "pointer" }}>
                      <a>
                        <FaEye />
                      </a>
                    </td>
                    <td>
                      <button>
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
          ) : (
            <p>No orders found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SaleEntry;
