import "./../order/orderprintpre.css";
import React, { useRef, useState } from "react";

const LastBill = ({ billData, closeModal }) => {
  const modalRef = useRef(null);
  const [printFormat, setPrintFormat] = useState("A4");

  const handlePrint = () => {
    if (modalRef.current) {
      let printContent;
      if (printFormat === "A4") {
        printContent = renderA4Template();
      } else if (printFormat === "A5") {
        printContent = renderA5Template();
      } else if (printFormat === "3inch") {
        printContent = render3InchTemplate();
      }

      const printWindow = window.open("", "_blank");
      printWindow.document.open();
      printWindow.document.write(`
        <html>
          <head>
            <title>Print Order</title>
            <style>
              @media print {
                body * {
                  visibility: hidden;
                }
                .modal-content, .modal-content * {
                  visibility: visible;
                }
                .modal-content {
                  position: absolute;
                  left: 0;
                  top: 0;
                  width: 100%;
                }
              }
              body {
                font-family: Arial, sans-serif;
                padding: 20px;
              }
              .modal-content {
                padding: 20px;
              }
              .row {
                display: flex;
                flex-wrap: wrap;
                margin: 0 -15px;
              }
              .col {
                flex: 1;
                padding: 0 15px;
              }
              .table-wrapper table {
                width: 95%;
                border-collapse: collapse;
                margin: 20px 0;
              }
              .table-wrapper th, .table-wrapper td {
                border: 1px solid #000;
                padding: 8px;
                text-align: left;
                border: 1px solid black;
                border-collapse: collapse;
              }
              .button-wrapper {
                margin-top: 20px;
              }
              .button {
                display: inline-block;
                padding: 10px 20px;
                font-size: 16px;
                cursor: pointer;
                text-align: center;
                text-decoration: none;
                border: none;
                border-radius: 4px;
                margin-right: 10px;
              }
              .button-primary {
                background-color: #007bff;
                color: white;
              }
              .button-secondary {
                background-color: #6c757d;
                color: white;
              }
              .print-button {
                display: none;
              }
              @page {
                size: ${
                  printFormat === "A4"
                    ? "A4"
                    : printFormat === "A5"
                    ? "A5 landscape"
                    : "80mm 100mm"
                };
              }
            </style>
          </head>
          <body>
            <div class="modal-content">
              ${printContent}
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
      printWindow.close();
    }
  };

  if (!billData) {
    return null; // If billData is null or undefined, do not render anything
  }

  const { customer, products, bill_details } = billData;

  const renderA4Template = () => {
    return `
      <center><h2>Estimate (A4)</h2></center>
      <hr />
      <div>
        <div class="row">
          <div class="col"><b>Party name:</b><div>${customer.name}</div></div>
          <div class="col"><b>Billed Date:</b><div>${
            bill_details.date
          }</div></div>
          <div class="col"><b>Deliver Date:</b><div>${
            bill_details.bill_date
          }</div></div>
        </div>
        <div class="table-wrapper">
          <table>
            <thead><tr><th>Product Name</th><th>Single Price</th><th>Scale</th><th>Quantity</th><th>Total Price</th></tr></thead>
            <tbody>
              ${products
                .map(
                  (product) => `
                <tr>
                  <td>${product.name}</td>
                  <td>${product.single_price}</td>
                  <td>${product.scale}</td>
                  <td>${product.quantity}</td>
                  <td>${product.price}</td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>
        </div>
      </div>
    `;
  };

  const renderA5Template = () => {
    return `
      <center><h2>Estimate (A5)</h2></center>
      <hr />
      <div>
        <div class="row">
          <div class="col"><b>Party name:</b><div>${customer.name}</div></div>
          <div class="col"><b>Billed Date:</b><div>${
            bill_details.date
          }</div></div>
          <div class="col"><b>Deliver Date:</b><div>${
            bill_details.bill_date
          }</div></div>
        </div>
        <div class="table-wrapper">
          <table>
            <thead><tr><th>Product Name</th><th>Single Price</th><th>Scale</th><th>Quantity</th><th>Total Price</th></tr></thead>
            <tbody>
              ${products
                .map(
                  (product) => `
                <tr>
                  <td>${product.name}</td>
                  <td>${product.single_price}</td>
                  <td>${product.scale}</td>
                  <td>${product.quantity}</td>
                  <td>${product.price}</td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>
        </div>
      </div>
    `;
  };

  const render3InchTemplate = () => {
    return `
      <center><h2>Estimate (3-inch Receipt)</h2></center>
      <hr />
      <div>
        <div class="row">
          <div class="col"><b>Party name:</b><div>${customer.name}</div></div>
          <div class="col"><b>Billed Date:</b><div>${
            bill_details.date
          }</div></div>
          <div class="col"><b>Deliver Date:</b><div>${
            bill_details.bill_date
          }</div></div>
        </div>
        <div class="table-wrapper">
          <table>
            <thead><tr><th>Product Name</th><th>Single Price</th><th>Scale</th><th>Quantity</th><th>Total Price</th></tr></thead>
            <tbody>
              ${products
                .map(
                  (product) => `
                <tr>
                  <td>${product.name}</td>
                  <td>${product.single_price}</td>
                  <td>${product.scale}</td>
                  <td>${product.quantity}</td>
                  <td>${product.price}</td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>
        </div>
      </div>
    `;
  };

  return (
    <div className="modal">
      <div ref={modalRef} className="modal-content">
        <center>
          <h2>Estimate</h2>
        </center>
        <hr />
        <div>
          <div className="row">
            <div className="col">
              <div>
                <b>Party name:</b>
                <div>{customer.name}</div>
              </div>
            </div>
            <div className="col">
              <div>
                <b>Billed Date:</b>
                <div>{bill_details.date}</div>
              </div>
            </div>
            <div className="col">
              <div>
                <b>Deliver Date:</b>
                <div>{bill_details.bill_date}</div>
              </div>
            </div>
          </div>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Single Price</th>
                  <th>Scale</th>
                  <th>Quantity</th>
                  <th>Total Price</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={index}>
                    <td>{product.name}</td>
                    <td>{product.single_price}</td>
                    <td>{product.scale}</td>
                    <td>{product.quantity}</td>
                    <td>{product.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="button-wrapper">
          <button onClick={closeModal} className="button button-secondary">
            Close
          </button>
          <button onClick={handlePrint} className="button button-primary">
            Print
          </button>
          <div>
            <label htmlFor="print-format">Select Print Format: </label>
            <select
              id="print-format"
              value={printFormat}
              onChange={(e) => setPrintFormat(e.target.value)}
            >
              <option value="A4">A4</option>
              <option value="A5">A5</option>
              <option value="3inch">3-inch Receipt</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LastBill;
