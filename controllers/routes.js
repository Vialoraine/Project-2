const itemsHandlers = require("./items_handlers.js")

exports.create = (app, Items) => {

  // CreateItem 
  app.post("/api/items", (req, res) => {
    itemsHandlers.createItem(req, res, Items)
  })

  // ListItems
  app.get("/api/items", (req, res) => {
    itemsHandlers.listItems(req, res, Items)
  })

  // DeleteItem 
  app.delete("/api/items/:id", (req, res) => {
    itemsHandlers.deleteItem(req, res, Items)
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

}