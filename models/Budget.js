const { Model, DataTypes } = require('sequelize')
const sequelize = require('../db')

class Budget extends Model { }

Budget.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, { sequelize, modelName: ' budget' })

module.exports = Budget
