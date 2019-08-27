const Sequelize = require('sequelize')
const db = require('../db.js')

const Game = db.define(
    'game',
    {
        wheelValue: {
            type: Sequelize.STRING
        },
        guessed: {
            type: Sequelize.ARRAY(Sequelize.STRING(1))
        },
        round: {
            type: Sequelize.INTEGER
        },
        finished: {
            type: Sequelize.BOOLEAN
        }
    },
    { timestamps: false }
)
module.exports = Game
