const express = require('express')
const User = require('./model.js')
const bcrypt = require('bcrypt');
const router=express.Router()
const auth = require('../auth/middleware')

router.post('/users', function (req, res,next) {
  const user = {
    name: req.body.username,
    password: bcrypt.hashSync(req.body.password, 10),
    score: 0,
    turn: 0
  }
  User
    .create(user)
    .then(user => res.status(201).json({
                            message: "A NEW USER WAS ADDED",
                              "new user": user.username
    }))
    .catch(next)
})

router.put('/users/:id', auth, (req, res, next) => {
  const id = req.params.id
  User
    .findByPk(id)
    .then(user=>{
          if(user.name!==req.user.username){
            res
              .status(403)
              .send({
                message: "You cannot modify another user's information"
              })
          }else{
                user.update(req.body)
                .then(user => res.status(200).json(user))
                .catch(next)
          }
    })
    .catch(next)
}) 

router.get('/users', function (req, res, next) {
  const sortProperty = req.query.sortBy
  const limit = 10
  const offset = 0
  User
    .findAndCountAll({ limit, offset, order: [[sortProperty,'DESC']]})
    .then(users => { res.json(users.rows.map(user => [user.name,user.score])) })
    .catch(next)
})

  module.exports = router