const Sequelize = require('sequelize')
const db = require('../db')
const Game = require('../games/model')

const User = db.define(
  'user',
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      field: 'user_name'
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      field: 'user_password'
    },
    score: {
      type: Sequelize.INTEGER,
      field: 'user_score'
    },
    highestScore: {
      type: Sequelize.INTEGER,
      field: 'user_highestScore'
    },
    turn: {
      type: Sequelize.INTEGER,
      field: 'user_turn'
    }
  }, 
  {timestamps: false}
)
User.belongsTo(Game)
Game.hasMany(User)
module.exports = User