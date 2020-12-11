const path = require('path')
const express = require("express")
const app = express()
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
const port = 8000

var mysql = require('mysql2')
const { format } = require('path')

// Create database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Dreyfany@2014",
  database: "budget"
})

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

  // Check if the item exists in the items table
  let query = `SELECT id, name, description, price FROM items WHERE name="${req.body.name}"`
  db.query(query, (err, rows) => {
    if (err) {
      console.log(err)
      res.send({
        code: 500,
        status: "Internal Server Error"
      })
      return
    }

    if (rows.length > 0) {
      console.log("item already exists")
      res.send({
        code: 409,
        status: "Conflict",
        message: "item already exists"
      })
      return
    }

    // Create the record in the items table
    query = `INSERT INTO items (name, description, price) VALUES ("${req.body.name}", "${req.body.description}", ${req.body.price})`
    db.query(query, (err, dbRes) => {
      if (err) {
        console.log(err)
        res.send({
          code: 500,
          status: "Internal Server Error"
        })
        return
      }

      // Handle success
      res.send({
        item: {
          name: req.body.name,
          description: req.body.description,
          price: req.body.price
        }
      })
    })

  })
  
})

const validateCreateItemRequest = (body) => {
  let errs = ""
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
  console.log(`{"endpoint":"LIST_ITEMS","message":"request-received"}`)
  
  // List records from the items table
  query = `SELECT id, name, description, price FROM items`
  db.query(query, (err, rows) => {
    if (err) {
      console.log(err)
      res.send({
        code: 500,
        status: "Internal Server Error"
      })
      return
    }

    // Handle success
    res.send({
      items: rows
    })
  })
})

// DeleteItem deletes a record in the items table
app.delete("/api/items/:id", (req, res) => {
  console.log(`{"endpoint":"DELETE_ITEM","message":"request-received"}`)

  // Delete record from items table
  query = `DELETE FROM items WHERE id=${req.params.id}`
  db.query(query, (err, dbRes) => {
    if (err) {
      console.log(err)
      res.send({
        code: 500,
        status: "Internal Server Error"
      })
      return
    }

    // Handle success
    res.send({
      code: 200,
      status: "Ok",
      message: "item successfully deleted"
    })
  })

})