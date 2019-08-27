const Sequelize = require('sequelize')
const express = require('express')
const Game = require('./model.js')
const router = express.Router()
const Sse = require('json-sse')
const stream = new Sse()
const Op = Sequelize.Op

router.get('/stream/:id', function (req, res, next) {
  Game
    .findAll({where:{id:req.params.id}})
    .then(game => {
      const json = JSON.stringify(game)
      stream.init(req, res)
      return stream.updateInit(json)
    })
    .catch(next)
})

router.get('/games', function (req, res, next) {
  Game
    .findAll({where:
              {finished: {[Op.not]:true}
    }})
    .then(games => {
      const json = JSON.stringify(games)
      return json
    })
    .catch(next)
})

router.post('/game', function (req, res, next) {
  Game.create(req.body)
    .then(game => {
      const json = JSON.stringify(game)
      stream.updateInit(json)
      return res.status(201)
        .send(game)
    })
    .catch(next)
})

router
  .put('/game/:id', (req, res, next) => {
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