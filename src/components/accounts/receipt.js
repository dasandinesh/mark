import React, { useEffect, useState } from "react";
import axios from "axios";
import { URL_get_receipt, URL_new_receipt } from "../url/url";

const ReceiptList = () => {
  const [receiptList, setReceiptList] = useState([]);
  const [filteredReceipts, setFilteredReceipts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [payMethod, setPayMethod] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const paymentMethods = [
    { value: "", label: "Payment Method" },
    { value: "cash", label: "Cash" },
    { value: "UPI", label: "UPI" },
    { value: "Netbanking", label: "Netbanking" },
    { value: "paypal", label: "PayPal" },
  ];

  useEffect(() => {
    const getReceiptList = async () => {
      try {
        const response = await axios.get(URL_get_receipt);
        setReceiptList(response.data);
        setFilteredReceipts(response.data); // Initialize filteredReceipts
      } catch (error) {
        console.error("Error fetching the receipt list:", error);
      }
    };

    getReceiptList();
  }, []);

  useEffect(() => {
    filterReceipts();
  }, [fromDate, toDate, receiptList]);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (amount <= 0) {
      setError("Amount must be a positive number");
      return;
    }

    const newReceipt = {
      customerName,
      date,
      amount,
      description,
      category,
      payMethod,
    };

    try {
      const response = await axios.post(URL_new_receipt, newReceipt);
      setReceiptList([...receiptList, response.data]);
      setCustomerName("");
      setDate("");
      setAmount("");
      setDescription("");
      setCategory("");
      setPayMethod("");
      setSuccess("Receipt added successfully!");
      handleClose();
    } catch (error) {
      setError("Error adding the receipt");
      console.error("Error adding the receipt:", error);
    }
  };

  const filterReceipts = () => {
    const filtered = receiptList.filter((receipt) => {
      const receiptDate = new Date(receipt.date);
      const from = fromDate ? new Date(fromDate) : null;
      const to = toDate ? new Date(toDate) : null;
      if (from && to) {
        return receiptDate >= from && receiptDate <= to;
      } else if (from) {
        return receiptDate >= from;
      } else if (to) {
        return receiptDate <= to;
      }
      return true;
    });
    setFilteredReceipts(filtered);
  };

  return (
    <div>
      <h2>Receipts</h2>
      <button onClick={handleShow}>Add Receipt</button>
      <div className="row">
        <div className="col-3">
          <div>
            <p>Customer Name:</p>
            <input type="text" required />
          </div>
        </div>
        <div className="col-3">
          <div>
            <p>From Date:</p>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              required
            />
          </div>
          <div>
            <p>To Date:</p>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="col-3">
          <div>
            <p>Category:</p>
            <input type="text" required />
          </div>
        </div>
        <div className="col-3">
          <p>PayMethod:</p>
          <select
            value={payMethod}
            onChange={(e) => setPayMethod(e.target.value)}
            required
          >
            {paymentMethods.map((method) => (
              <option key={method.value} value={method.value}>
                {method.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Description</th>
            <th>Category</th>
            <th>Pay Method</th>
          </tr>
        </thead>
        <tbody>
          {filteredReceipts.map((receipt, index) => (
            <tr key={index}>
              <td>{receipt.customerName}</td>
              <td>{receipt.date}</td>
              <td>{receipt.amount}</td>
              <td>{receipt.description}</td>
              <td>{receipt.category}</td>
              <td>{receipt.payMethod}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal" onClick={handleClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={handleClose}>
              &times;
            </span>
            <center>
              <h1>Receipt Entry</h1>
              {error && <p style={{ color: "red" }}>{error}</p>}
              {success && <p style={{ color: "green" }}>{success}</p>}
              <form onSubmit={handleSubmit}>
                <div>
                  <label>Customer Name:</label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label>Date:</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label>Amount:</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label>Description:</label>
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label>Category:</label>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label>PayMethod:</label>
                  <select
                    value={payMethod}
                    onChange={(e) => setPayMethod(e.target.value)}
                    required
                  >
                    {paymentMethods.map((method) => (
                      <option key={method.value} value={method.value}>
                        {method.label}
                      </option>
                    ))}
                  </select>
                </div>
                <button type="submit">Add Receipt</button>
              </form>
            </center>
          </div>
        </div>
      )}

      <style jsx>{`
        .modal {
          display: flex;
          position: fixed;
          z-index: 1;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          overflow: auto;
          background-color: rgba(0, 0, 0, 0.4);
          justify-content: center;
          align-items: center;
        }
        .modal-content {
          background-color: #fefefe;
          padding: 20px;
          border: 1px solid #888;
          width: 80%;
          max-width: 500px;
          position: relative;
        }
        .close {
          color: #aaa;
          float: right;
          font-size: 28px;
          font-weight: bold;
          position: absolute;
          top: 10px;
          right: 15px;
        }
        .close:hover,
        .close:focus {
          color: black;
          text-decoration: none;
          cursor: pointer;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px;
        }
        table,
        th,
        td {
          border: 1px solid #ddd;
        }
        th,
        td {
          padding: 8px;
          text-align: left;
        }
        th {
          background-color: #f2f2f2;
        }
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
        input[type="text"],
        input[type="date"],
        input[type="number"] {
          padding: 8px;
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
};

export default ReceiptList;
