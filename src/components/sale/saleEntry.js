import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import {
  URL_CUS,
  URL_PRO_add,
  URL_ORD_add,
  URL_ORD_list,
  URL_ORD_select,
} from "../url/url";
import axios from "axios";
import { useEffect, useState } from "react";

const SaleEntry = () => {
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
    console.log(data);

    try {
      // Assuming your server expects data in the following format
      const requestData = {
        customer: data.customer,
        products: data.products,
        bill_details: data.bill_details,
      };

      // Send data to the server using Axios
      const response = await axios.post(URL_ORD_add, requestData);

      console.log("Server Response:", response.data);
      // You can handle the server response here if needed
    } catch (error) {
      console.error("Error while submitting data:", error);
      // Handle error appropriately
    }
  };

  const [list, setCuslist] = useState([]);

  useEffect(() => {
    cus_get_list();
  }, []);

  const cus_get_list = async () => {
    try {
      const res = await axios.get(URL_PRO_add);
      // Assuming your response contains an array of customers
      setCuslist(res.data);
    } catch (error) {
      console.error("Error fetching customer list:", error);
    }
  };
  const editbill = (id) => {
    const list = async () => {
      try {
        console.log(id);
        const res = await axios.get(URL_ORD_select, { params: { id } });

        console.log(res.data);
        const { customer, products, bill_details } = res.data;

        // Assuming your server response structure matches the form structure
        reset({ customer, products, bill_details });

        console.log("Form data reset for editing:", { customer, products });
      } catch (error) {
        console.error("Error fetching customer list:", error);
      }
    };
    list(id);
  };
  useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0];
    setValue("bill_details.date", currentDate);
    setValue("bill_details.bill_date", currentDate);
  }, [setValue]);
  return (
    <div className="row">
      <div className="col-9">
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
              </table>
            </div>
          </div>
          <hr></hr>
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
                    />
                  </td>
                  <td>
                    <input
                      {...register(`products.${index}.quantity`)}
                      placeholder="Quantity"
                      type="number"
                    />
                  </td>
                  <td>
                    <input
                      {...register(`products.${index}.single_price`)}
                      placeholder="Single Price"
                      type="number"
                    />
                  </td>
                  <td>
                    <input
                      {...register(`products.${index}.scale`)}
                      placeholder="Scale"
                      type="text"
                    />
                  </td>
                  <td>
                    <input
                      {...register(`products.${index}.price`)}
                      placeholder="Price"
                      type="number"
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

          <button type="button" onClick={onAddProduct}>
            Add Product
          </button>
          <br />
          <br />
          <hr />
          <div className="row">
            <div className="col-3"></div>
            <div className="col-4">
              <table>
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
              </table>
            </div>
            <div className="col-4">
              <table>
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
              </table>
            </div>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
      <div className="col-3">
        <h3>order</h3>
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Views</th>
            </tr>
          </thead>
          <tbody>
            {list.map((customer, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{customer.customer.name}</td>
                <td>{customer._id}</td>
                <td>
                  <a onClick={() => editbill(customer._id)}>Views</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SaleEntry;
