const Sequelize = require('sequelize')

const sequelize = new Sequelize(process.env.JAWSDB_URL || 'mysql://root:root@localhost/lists_db')

module.exports = sequelize
