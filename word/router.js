const express = require('express')
const Word = require('./model.js')
const router=express.Router()
const auth = require('../auth/middleware')

router.post('/category/:id', auth, (req, res, next) => {
    const id = req.params.id
    const word = { 
        puzzle: req.body.puzzle,
        clue: req.body.clue,
        level: req.body.level,
        categoryId: id,
        video_url: req.body.video_url,
        video_time: req.body.video_time
    }
  Word
    .create(word)
    .then(word => res.status(201).json(word))
    .catch(err => {next(err)})
})

router.get('/words/:level', auth, (req, res, next) => {
    Word
        .findAll({
            where: {level:req.params.level}
        })
        .then(word => {res.json({ words: word })})
        .catch(next)
})

router.delete('/word', auth, (req, res, next) => {
    Word.destroy({
        where: {content:req.body.content}
    }) 
    .then(word => {res.json({ word: word })})
    .catch(err => {next(err)
      })
  })

  module.exports = router