const express = require('express')
const Word = require('./model.js')
const router=express.Router()

router.post('/category/:id', function (req, res,next) {
    const id = req.params.id
    const word = { 
        puzzle: req.body.puzzle,
        clue: req.body.clue,
        level: req.body.level,
        categoryId: id
    }
  Word
    .create(word)
    .then(word => res.status(201).json(word))
    .catch(err => {next(err)})
})

router.get('/words/:level', function (req, res, next) {
    Word
        .findAll({
            where: {level:req.params.level}
        })
        .then(word => {res.json({ words: word })})
        .catch(next)
})

router.delete('/word', function (req, res, next) {
    Word.destroy({
        where: {content:req.body.content}
    }) 
    .then(word => {res.json({ word: word })})
    .catch(err => {next(err)
      })
  })

  module.exports = router