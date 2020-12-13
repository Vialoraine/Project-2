const path = require('path')
const express = require("express")
const app = express()
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
const port = 8000
const routes = require("./controllers/routes.js")

const models = require("./models")
models.sequelize.sync()
const Items = models.items
const Users = models.users

app.listen(port, () => {
  console.log("listening on http://localhost:" + port)
})

routes.create(app, Items, Users)