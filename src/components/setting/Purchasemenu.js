import React, { useState } from "react";
import axios from "axios";

const Purchasemenu = () => {
  const [formData, setFormData] = useState({
    bill_form: false,
    serial_no: false,
    description: false,
    hsn: false,
    gstpre: false,
    cross_price: false,
    cross_price_total: false,
    cgst: false,
    sgst: false,
    scale_no: false,
    bag_price: false,
    wages: false,
    commission: false,
    bill_form_invoice: false,
    serial_no_invoice: false,
    description_invoice: false,
    hsn_invoice: false,
    gstpre_invoice: false,
    cross_price_invoice: false,
    cross_price_total_invoice: false,
    cgst_invoice: false,
    sgst_invoice: false,
    scale_no_invoice: false,
    bag_price_invoice: false,
    wages_invoice: false,
    commission_invoice: false,
    transport_invoice: false,
    shipping_bill_address: false,
    banking_details: false,
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("/api/endpoint", formData)
      .then((response) => {
        console.log("Form submitted successfully:", response.data);
        // Handle successful form submission (e.g., display a success message)
      })
      .catch((error) => {
        console.error("There was an error submitting the form:", error);
        // Handle form submission error (e.g., display an error message)
      });
  };

  return (
    <div>
      <h2>Purchase Menu</h2>
      <form>
        <h4>Purchase Form</h4>
        <div>
          <table>
            <tr key="">
              <th>Bill form</th>
              <th>serial no</th>
              <th>description</th>
              <th>HSN</th>
              <th>gstpre</th>
              <th>cross price</th>
              <th>cross price total </th>
              <th>Cgst</th>
              <th>sgst</th>
              <th>scale no</th>
              <th>bag price</th>
              <th>Wages</th>
              <th>commission</th>
            </tr>
            <tr key="">
              <td>
                {" "}
                <input type="checkbox" name="vehicle1" value="Bike" />
              </td>
              <td>
                {" "}
                <input type="checkbox" name="vehicle1" value="Bike" />
              </td>
              <td>
                {" "}
                <input type="checkbox" name="vehicle1" value="Bike" />
              </td>
              <td>
                {" "}
                <input type="checkbox" name="vehicle1" value="Bike" />
              </td>
              <td>
                {" "}
                <input type="checkbox" name="vehicle1" value="Bike" />
              </td>
              <td>
                {" "}
                <input type="checkbox" name="vehicle1" value="Bike" />
              </td>
              <td>
                {" "}
                <input type="checkbox" name="vehicle1" value="Bike" />
              </td>
              <td>
                {" "}
                <input type="checkbox" name="vehicle1" value="Bike" />
              </td>
              <td>
                {" "}
                <input type="checkbox" name="vehicle1" value="Bike" />
              </td>
              <td>
                {" "}
                <input type="checkbox" name="vehicle1" value="Bike" />
              </td>
              <td>
                {" "}
                <input type="checkbox" name="vehicle1" value="Bike" />
              </td>
              <td>
                {" "}
                <input type="checkbox" name="vehicle1" value="Bike" />
              </td>
              <td>
                {" "}
                <input type="checkbox" name="vehicle1" value="Bike" />
              </td>
            </tr>
          </table>
        </div>
        <h4>Purchase invoice</h4>
        <div>
          <table>
            <tr key="">
              <th>Bill form</th>
              <th>serial no</th>
              <th>description</th>
              <th>HSN</th>
              <th>gstpre</th>
              <th>cross price</th>
              <th>cross price total </th>
              <th>Cgst</th>
              <th>sgst</th>
              <th>scale no</th>
              <th>bag price</th>
              <th>Wages</th>
              <th>commission</th>
            </tr>
            <tr key="">
              <td>
                {" "}
                <input type="checkbox" name="vehicle1" value="Bike" />
              </td>
              <td>
                {" "}
                <input type="checkbox" name="vehicle1" value="Bike" />
              </td>
              <td>
                {" "}
                <input type="checkbox" name="vehicle1" value="Bike" />
              </td>
              <td>
                {" "}
                <input type="checkbox" name="vehicle1" value="Bike" />
              </td>
              <td>
                {" "}
                <input type="checkbox" name="vehicle1" value="Bike" />
              </td>
              <td>
                {" "}
                <input type="checkbox" name="vehicle1" value="Bike" />
              </td>
              <td>
                {" "}
                <input type="checkbox" name="vehicle1" value="Bike" />
              </td>
              <td>
                {" "}
                <input type="checkbox" name="vehicle1" value="Bike" />
              </td>
              <td>
                {" "}
                <input type="checkbox" name="vehicle1" value="Bike" />
              </td>
              <td>
                {" "}
                <input type="checkbox" name="vehicle1" value="Bike" />
              </td>
              <td>
                {" "}
                <input type="checkbox" name="vehicle1" value="Bike" />
              </td>
              <td>
                {" "}
                <input type="checkbox" name="vehicle1" value="Bike" />
              </td>
              <td>
                {" "}
                <input type="checkbox" name="vehicle1" value="Bike" />
              </td>
            </tr>
            <tr key="">
              <th>shiping Bill address</th>
              <th>banking detailes</th>
            </tr>
            <tr key="">
              <td>
                {" "}
                <input type="checkbox" name="vehicle1" value="Bike" />
              </td>
              <td>
                {" "}
                <input type="checkbox" name="vehicle1" value="Bike" />
              </td>
            </tr>
          </table>
        </div>
        <button className="buttonb" type="submit">
          save Purchase setting
        </button>
      </form>
      <form>
        <h4>GST Sale Form</h4>
        <div>
          <table>
            <tr key="">
              <th>Bill form</th>
              <th>serial no</th>
              <th>description</th>
              <th>HSN</th>
              <th>gstpre</th>
              <th>cross price</th>
              <th>cross price total </th>
              <th>Cgst</th>
              <th>sgst</th>
              <th>scale no</th>
              <th>bag price</th>
              <th>Wages</th>
              <th>commission</th>
            </tr>
            <tr key="">
              <td>
                {" "}
                <input type="checkbox" name="vehicle1" value="Bike" />
              </td>
              <td>
                {" "}
                <input type="checkbox" name="vehicle1" value="Bike" />
              </td>
              <td>
                {" "}
                <input type="checkbox" name="vehicle1" value="Bike" />
              </td>
              <td>
                {" "}
                <input type="checkbox" name="vehicle1" value="Bike" />
              </td>
              <td>
                {" "}
                <input type="checkbox" name="vehicle1" value="Bike" />
              </td>
              <td>
                {" "}
                <input type="checkbox" name="vehicle1" value="Bike" />
              </td>
              <td>
                {" "}
                <input type="checkbox" name="vehicle1" value="Bike" />
              </td>
              <td>
                {" "}
                <input type="checkbox" name="vehicle1" value="Bike" />
              </td>
              <td>
                {" "}
                <input type="checkbox" name="vehicle1" value="Bike" />
              </td>
              <td>
                {" "}
                <input type="checkbox" name="vehicle1" value="Bike" />
              </td>
              <td>
                {" "}
                <input type="checkbox" name="vehicle1" value="Bike" />
              </td>
              <td>
                {" "}
                <input type="checkbox" name="vehicle1" value="Bike" />
              </td>
              <td>
                {" "}
                <input type="checkbox" name="vehicle1" value="Bike" />
              </td>
            </tr>
          </table>
        </div>
        <h4>GST Sale invoice</h4>
        <div>
          <table>
            <tr key="">
              <th>Bill form</th>
              <th>serial no</th>
              <th>description</th>
              <th>HSN</th>
              <th>gstpre</th>
              <th>cross price</th>
              <th>cross price total </th>
              <th>Cgst</th>
              <th>sgst</th>
              <th>scale no</th>
              <th>bag price</th>
              <th>Wages</th>
              <th>commission</th>
            </tr>
            <tr key="">
              <td>
                {" "}
                <input type="checkbox" name="vehicle1" value="Bike" />
              </td>
              <td>
                {" "}
                <input type="checkbox" name="vehicle1" value="Bike" />
              </td>
              <td>
                {" "}
                <input type="checkbox" name="vehicle1" value="Bike" />
              </td>
              <td>
                {" "}
                <input type="checkbox" name="vehicle1" value="Bike" />
              </td>
              <td>
                {" "}
                <input type="checkbox" name="vehicle1" value="Bike" />
              </td>
              <td>
                {" "}
                <input type="checkbox" name="vehicle1" value="Bike" />
              </td>
              <td>
                {" "}
                <input type="checkbox" name="vehicle1" value="Bike" />
              </td>
              <td>
                {" "}
                <input type="checkbox" name="vehicle1" value="Bike" />
              </td>
              <td>
                {" "}
                <input type="checkbox" name="vehicle1" value="Bike" />
              </td>
              <td>
                {" "}
                <input type="checkbox" name="vehicle1" value="Bike" />
              </td>
              <td>
                {" "}
                <input type="checkbox" name="vehicle1" value="Bike" />
              </td>
              <td>
                {" "}
                <input type="checkbox" name="vehicle1" value="Bike" />
              </td>
              <td>
                {" "}
                <input type="checkbox" name="vehicle1" value="Bike" />
              </td>
            </tr>
            <tr key="">
              <th>shiping Bill address</th>
              <th>banking detailes</th>
            </tr>
            <tr key="">
              <td>
                {" "}
                <input type="checkbox" name="vehicle1" value="Bike" />
              </td>
              <td>
                {" "}
                <input type="checkbox" name="vehicle1" value="Bike" />
              </td>
            </tr>
          </table>
        </div>
        <button className="buttonb" type="submit">
          save Purchase setting
        </button>
      </form>
      <form onSubmit={handleSubmit}>
        <h4>Estimate Form</h4>
        <div>
          <table>
            <thead>
              <tr>
                <th>Bill form</th>
                <th>serial no</th>
                <th>description</th>
                <th>HSN</th>
                <th>gstpre</th>
                <th>cross price</th>
                <th>cross price total</th>
                <th>Cgst</th>
                <th>sgst</th>
                <th>scale no</th>
                <th>bag price</th>
                <th>Wages</th>
                <th>commission</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    name="bill_form"
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    name="serial_no"
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    name="description"
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input type="checkbox" name="hsn" onChange={handleChange} />
                </td>
                <td>
                  <input
                    type="checkbox"
                    name="gstpre"
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    name="cross_price"
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    name="cross_price_total"
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input type="checkbox" name="cgst" onChange={handleChange} />
                </td>
                <td>
                  <input type="checkbox" name="sgst" onChange={handleChange} />
                </td>
                <td>
                  <input
                    type="checkbox"
                    name="scale_no"
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    name="bag_price"
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input type="checkbox" name="wages" onChange={handleChange} />
                </td>
                <td>
                  <input
                    type="checkbox"
                    name="commission"
                    onChange={handleChange}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <h4>Estimate Invoice</h4>
        <div>
          <table>
            <thead>
              <tr>
                <th>Bill form</th>
                <th>serial no</th>
                <th>description</th>
                <th>HSN</th>
                <th>gstpre</th>
                <th>cross price</th>
                <th>cross price total</th>
                <th>Cgst</th>
                <th>sgst</th>
                <th>scale no</th>
                <th>bag price</th>
                <th>Wages</th>
                <th>commission</th>
                <th>transport</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    name="bill_form_invoice"
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    name="serial_no_invoice"
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    name="description_invoice"
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    name="hsn_invoice"
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    name="gstpre_invoice"
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    name="cross_price_invoice"
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    name="cross_price_total_invoice"
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    name="cgst_invoice"
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    name="sgst_invoice"
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    name="scale_no_invoice"
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    name="bag_price_invoice"
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    name="wages_invoice"
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    name="commission_invoice"
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    name="transport_invoice"
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <th>shipping Bill address</th>
                <th>banking details</th>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    name="shipping_bill_address"
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    name="banking_details"
                    onChange={handleChange}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <button className="buttonb" type="submit">
          Save Purchase Setting
        </button>
      </form>
      export default EstimateForm;
      <form>
        <h4>Order Form</h4>
        <div>
          <table>
            <tr key="">
              <th>Bill form</th>
              <th>serial no</th>
              <th>description</th>
              <th>HSN</th>
              <th>gstpre</th>
              <th>cross price</th>
              <th>cross price total </th>
              <th>Cgst</th>
              <th>sgst</th>
              <th>scale no</th>
              <th>bag price</th>
              <th>Wages</th>
              <th>commission</th>
            </tr>
            <tr key="">
              <td>
                {" "}
                <input type="checkbox" name="vehicle1" value="Bike" />
              </td>
              <td>
                {" "}
                <input type="checkbox" name="vehicle1" value="Bike" />
              </td>
              <td>
                {" "}
                <input type="checkbox" name="vehicle1" value="Bike" />
              </td>
              <td>
                {" "}
                <input type="checkbox" name="vehicle1" value="Bike" />
              </td>
              <td>
                {" "}
                <input type="checkbox" name="vehicle1" value="Bike" />
              </td>
              <td>
                {" "}
                <input type="checkbox" name="vehicle1" value="Bike" />
              </td>
              <td>
                {" "}
                <input type="checkbox" name="vehicle1" value="Bike" />
              </td>
              <td>
                {" "}
                <input type="checkbox" name="vehicle1" value="Bike" />
              </td>
              <td>
                {" "}
                <input type="checkbox" name="vehicle1" value="Bike" />
              </td>
              <td>
                {" "}
                <input type="checkbox" name="vehicle1" value="Bike" />
              </td>
              <td>
                {" "}
                <input type="checkbox" name="vehicle1" value="Bike" />
              </td>
              <td>
                {" "}
                <input type="checkbox" name="vehicle1" value="Bike" />
              </td>
              <td>
                {" "}
                <input type="checkbox" name="vehicle1" value="Bike" />
              </td>
            </tr>
          </table>
        </div>
        <h4>Order invoice</h4>
        <div>
          <table>
            <tr key="">
              <th>Bill form</th>
              <th>serial no</th>
              <th>description</th>
              <th>HSN</th>
              <th>gstpre</th>
              <th>cross price</th>
              <th>cross price total </th>
              <th>Cgst</th>
              <th>sgst</th>
              <th>scale no</th>
              <th>bag price</th>
              <th>Wages</th>
              <th>commission</th>
            </tr>
            <tr key="">
              <td>
                {" "}
                <input type="checkbox" name="vehicle1" value="Bike" />
              </td>
              <td>
                {" "}
                <input type="checkbox" name="vehicle1" value="Bike" />
              </td>
              <td>
                {" "}
                <input type="checkbox" name="vehicle1" value="Bike" />
              </td>
              <td>
                {" "}
                <input type="checkbox" name="vehicle1" value="Bike" />
              </td>
              <td>
                {" "}
                <input type="checkbox" name="vehicle1" value="Bike" />
              </td>
              <td>
                {" "}
                <input type="checkbox" name="vehicle1" value="Bike" />
              </td>
              <td>
                {" "}
                <input type="checkbox" name="vehicle1" value="Bike" />
              </td>
              <td>
                {" "}
                <input type="checkbox" name="vehicle1" value="Bike" />
              </td>
              <td>
                {" "}
                <input type="checkbox" name="vehicle1" value="Bike" />
              </td>
              <td>
                {" "}
                <input type="checkbox" name="vehicle1" value="Bike" />
              </td>
              <td>
                {" "}
                <input type="checkbox" name="vehicle1" value="Bike" />
              </td>
              <td>
                {" "}
                <input type="checkbox" name="vehicle1" value="Bike" />
              </td>
              <td>
                {" "}
                <input type="checkbox" name="vehicle1" value="Bike" />
              </td>
            </tr>
            <tr key="">
              <th>shiping Bill address</th>
              <th>banking detailes</th>
            </tr>
            <tr key="">
              <td>
                {" "}
                <input type="checkbox" name="vehicle1" value="Bike" />
              </td>
              <td>
                {" "}
                <input type="checkbox" name="vehicle1" value="Bike" />
              </td>
            </tr>
          </table>
        </div>
        <button className="buttonb" type="submit">
          save Purchase setting
        </button>
      </form>
      <style jsx>{`
        button {
          margin: 10px 0;
          padding: 10px 20px;
          background-color: #4caf50;
          color: white;
          border: none;
          cursor: pointer;
        }
        button:hover {
          background-color: #45a049;
        }
        form div {
          margin-bottom: 15px;
        }
        label {
          display: block;
          margin-bottom: 5px;
        }
        input {
          width: 15px;
          padding: 8px;
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
};
export default Purchasemenu;
