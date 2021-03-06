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
        },
        video_url: {
            type: Sequelize.STRING,
            field: 'word_video_url'
        },
        video_time: {
            type: Sequelize.INTEGER,
            field: 'word_video_time'
        }

    },
    {timestamps:false}
)
Word.belongsTo(Category)

module.exports = Word
  