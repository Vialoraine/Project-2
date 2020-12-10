const { Model, DataTypes } = require('sequelize')
const sequelize = require('../db')

class List extends Model { }

List.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  action: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, { sequelize, modelName: ' list' })

module.exports = List
