const path = require('path')
const express = require("express")
const app = express()
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
const port = 8000

var mysql = require('mysql2')

const models = require("../models")
models.sequelize.sync()
const Items = models.items
const handlers = require("./handlers.js")

app.listen(port, () => {
  console.log("listening on http://localhost:" + port)
})

// CreateItem 
app.post("/api/items", (req, res) => {
  handlers.createItem(req, res, Items)
})

// ListItems
app.get("/api/items", (req, res) => {
  handlers.listItems(req, res, Items)
})

// DeleteItem 
app.delete("/api/items/:id", (req, res) => {
  handlers.deleteItem(req, res, Items)
})

// Login
app.get("/api/login", (req, res) => {
})

// CreateUser
app.post("/api/users", (req, res) => {
})

// UpdateUser
app.put("/api/users", (req, res) => {
})