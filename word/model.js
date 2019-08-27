const Sequelize = require('sequelize')
const db = require('../db.js')
const Category = require('../category/model')

const Word = db.define(
    'word',
    {
        puzzle: {
            type: Sequelize.STRING,
            field: 'word_content'
        },
        clue: {
            type: Sequelize.STRING,
            field: 'word_clue'
        },
        level: {
            type: Sequelize.INTEGER,
            field: 'word_level'
        }

    },
    {timestamps:false}
)
Word.belongsTo(Category)

module.exports = Word
  