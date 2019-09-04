const Sequelize = require('sequelize')
const db = require('../db.js')
const User = require('../users/model')

const Game = db.define(
    'game',
    {
        wheelValue: {
            type: Sequelize.STRING,
            field: 'game_wheelValue'
        },
        wordId: {
            type: Sequelize.INTEGER,
            field: 'game_wordId'
        },
        guessed: {
            type: Sequelize.ARRAY(Sequelize.STRING(1)),
            field: 'game_guessed'
        },
        round: {
            type: Sequelize.INTEGER,
            field: 'game_round'
        },
        finished: {
            type: Sequelize.BOOLEAN,
            field: 'game_finished'
        },
        consonants: {
            type: Sequelize.ARRAY(Sequelize.STRING(1)),
            field: 'game_consonants'
        },
        vowels: {
            type: Sequelize.ARRAY(Sequelize.STRING(1)),
            field: 'game_vowels'
        }
    },
    { timestamps: false }
)
module.exports = Game
