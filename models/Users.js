const { Model, DataTypes } = require('sequelize')
const sequelize = require('../db')

class PocketUser extends Model { }

PocketUser.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, { sequelize, modelName: 'users' })

module.exports = PocketUser