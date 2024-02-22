import React, { useRef } from "react";
import "./orderprintpre.css";

const OrderPrintPre = ({ selectedOrder, closeModal }) => {
  const modalRef = useRef(null);

  const handlePrint = () => {
    const modal = modalRef.current;
    const originalDisplayStyle = modal.style.display;

    // Hide all other elements on the page
    const allElements = document.body.children;
    for (let element of allElements) {
      if (element !== modal) {
        element.style.display = "none";
      }
    }

    // Show the modal
    modal.style.display = "block";

    // Print the modal content
    window.print();

    // Revert the changes after printing
    modal.style.display = originalDisplayStyle;
    for (let element of allElements) {
      element.style.display = "";
    }
  };

  return (
    <div className="modal" ref={modalRef}>
      <div className="modal-content">
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        <h2>Order</h2>
        {selectedOrder && (
          <div>
            <div className="row">
              <div className="col-6">
                <table>
                  <tbody>
                    <tr>
                      <td>customer name</td>
                      <td> {selectedOrder.customer.name}</td>
                      <td></td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <h3>Members:</h3>
            {/* {selectedOrder.members.map((member, index) => (
              <div key={index}>
                <h4>Member {index + 1}</h4>
                <table>
                  <tbody>
                    {Object.entries(member).map(([key, value]) => (
                      <tr key={key}>
                        <td>{key}</td>
                        <td>{value}</td>
                      </tr>
                    ))}
                  </tbody>
                  <button onClick={() => handleViews(member)}>Views</button>
                </table>
              </div>
            ))} */}
          </div>
        )}
      </div>
      <button onClick={handlePrint}>Print</button>
    </div>
  );
};

export default OrderPrintPre;
