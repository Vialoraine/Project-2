const path = require('path');
const express = require("express");
const app = express();
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
const port = 8000;

const { v4: uuidv4 } = require('uuid');

app.listen(port, () => {
  console.log("listening on http://localhost:" + port)
})

// CreateItem creates a new record in the items table
app.post("/api/items", (req, res) => {
  console.log(`{"endpoint":"CREATE_ITEM","message":"request-received"}`)

  // Validate the request
  try {
    validateCreateItemRequest(req.body)
  } catch (e) {
    res.send({
      code: 400,
      status: "Bad Request",
      message: "invalid request param"
    })
    return
  }

  // Check if the item exists

  // If the item exists, throw an error

  // Create the record in the items table

  // Handle success
  res.send({
    success: true,
  })
})

const validateCreateItemRequest = (body) => {
  let errs = "";
  if (body.description == null || body.description == "") {
    errs += "invalid description "
  }
  if (body.price == null || isNaN(body.price)) {
    errs += "invalid price "
  }
  if (errs.length > 0) {
    throw new Error(errs)
  }
}

// ListItems lists records in the items table
app.get("/api/items", (req, res) => {
  console.log(`{"endpoint":"LIST_ITEMS","message":"request-received"}`);
  res.send({
    success: true,
  });
})

// DeleteItem deletes a record in the items table
app.delete("/api/items/:id", (req, res) => {
  console.log(`{"endpoint":"DELETE_ITEM","message":"request-received"}`);
  res.send({
    success: true,
  });
})