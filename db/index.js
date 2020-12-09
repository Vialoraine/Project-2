const Sequelize = require('sequelize')

const sequelize = new Sequelize(process.env.JAWSDB_URL || 'mysql://root:NUcode2020!114@localhost/lists_db')

module.exports = sequelize
