const Sequelize = require('sequelize')
const db = require('../db')

const User = db.define(
  'users',
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    score: {
      type: Sequelize.INTEGER
    },
    turn: {
      type: Sequelize.INTEGER
    }
  }, 
  {timestamps: false}
)

module.exports = User