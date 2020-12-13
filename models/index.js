const Sequelize = require('sequelize');
const sequelize = new Sequelize('budget', 'root', 'root', {
  host: "localhost",
  dialect: "mysql",
});

const models = {
    Sequelize: Sequelize,
    sequelize: sequelize,
    items: require("./items.js")(sequelize, Sequelize),
}

module.exports = models;