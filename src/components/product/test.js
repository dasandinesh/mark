exports = async function ({ query, headers, body }, response) {
  const purchaseCollection = context.services
    .get("chit")
    .db("test")
    .collection("purchase");
  const orderCollection = context.services
    .get("chit")
    .db("test")
    .collection("product");
  const accountCollection = context.services
    .get("chit")
    .db("test")
    .collection("ledger");

  try {
    // Parse the request body to get the new bill data
    const requestBody = body.text();

    let purchaseentry;
    try {
      purchaseentry = JSON.parse(requestBody);
    } catch (parseError) {
      console.error("Error parsing request body:", parseError);
      response.setStatusCode(400);
      response.setBody(
        JSON.stringify({ error: "Invalid JSON in request body" })
      );
      return;
    }

    // Insert the new bill with the incremented serial number
    const newpurchaseBill = await purchaseCollection.insertOne(purchaseentry);

    // Extract relevant details for the account collection
    const billDetails = newpurchaseBill.bill_details;
    const customer = newpurchaseBill.customer;
    const billAmount = billDetails.bill_amount;

    if (billDetails && customer && billAmount) {
      // Insert the new record into the account collection
      const accountRecord = {
        date: new Date().toISOString().split("T")[0],
        customer_name: customer.name,
        description: "purchase",
        credit: billDetails.credit,
        debit: "",
        serial_number: newSerialNumber,
      };
      await accountCollection.insertOne(accountRecord);
    } else {
      console.error("Missing required bill details or customer information.");
    }

    // Delete the corresponding order from the order collection based on date and customer name
    if (billDetails && customer) {
      await orderCollection.deleteOne({
        "bill_details.bill_date": billDetails.bill_date,
        "customer.name": customer.name,
      });
    }

    // Return the new bill document
    response.setStatusCode(200);
    response.setBody(JSON.stringify(newBill));
  } catch (error) {
    console.error("Error processing the new bill:", error);
    response.setStatusCode(500);
    response.setBody(
      JSON.stringify({
        error: "An error occurred while processing the new bill.",
      })
    );
  }
};
