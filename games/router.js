const Sequelize = require('sequelize')
const express = require('express')
const Game = require('./model.js')
const User = require('../users/model')
const Sse = require('json-sse')
const router=express.Router()
const stream = new Sse()
const Op = Sequelize.Op
const auth = require('../auth/middleware')

router.get('/stream/:id', auth, (req, res, next) => {
  Game
    .findAll({where: { id: req.params.id },
    include:[User]})
    .then(game => {
      const json = JSON.stringify(game)
      stream.init(req, res)
      return stream.updateInit(json)
    })
    .catch(next)
})

router.get('/games', (req, res, next) => {
  Game
    .findAll({ where: { finished: { [Op.not]:true } } })
    .then(games => res.send(games))
    .catch(next)
})

router.post('/game', auth, (req, res, next) => {
  Game
    .create(req.body)
    .then(game => {
      const json = JSON.stringify(game)
      stream.updateInit(json)
      return res.status(201)
        .send(game)
    })
    .catch(next)
})

router.put('/game/:id', auth, (req, res, next) => {
  const id = req.params.id
  Game
    .findByPk(id)
    .then(game =>  {
      const json = JSON.stringify(game)
      stream.updateInit(json)
      game.update({ guessed: req.body.guessed })
      .then(updatedGame => res.status(200).send(updatedGame))
    })
    .catch(next)
  })

module.exports = router