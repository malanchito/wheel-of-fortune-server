const Sequelize = require('sequelize')
const db = require('../db.js')

const Game = db.define(
    'game',
    {
        wheelValue: {
            type: Sequelize.STRING
        },
        wordId: {
            type: Sequelize.INTEGER
        },
        guessed: {
            type: Sequelize.ARRAY(Sequelize.STRING(1))
        },
        round: {
            type: Sequelize.INTEGER
        },
        finished: {
            type: Sequelize.BOOLEAN
        },
        consonants: {
            type: Sequelize.ARRAY(Sequelize.STRING(1))
        },
        vowels: {
            type: Sequelize.ARRAY(Sequelize.STRING(1))
        }
    },
    { timestamps: false }
)
module.exports = Game
