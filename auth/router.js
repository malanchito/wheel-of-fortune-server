const express = require('express')
const { toJWT } = require('./jwt')
const bcrypt = require('bcrypt');
const User = require('../users/model')
const router=express.Router()

router.post('/logins', (req, res, next) => {
    const username = req.body.username
    const password = req.body.password
    if (username && password) {
        User
            .findOne({
                where: {
                    name: username
                }
            })
            .then(entity => {
                if (!entity) {
                    res
                        .status(400)
                        .send({
                            message: 'User does not exist'
                        })
                }
                if (bcrypt.compareSync(password, entity.password)) {
                    res
                        .send({
                            message: `Welcome back ${entity.name}`,
                            jwt: toJWT({ userId: entity.id }),
                            user: entity.username
                        })
                } else {
                    res
                        .status(400)
                        .send({
                            message: 'Password was incorrect'
                        })
                }
            })
            .catch(err => {
                console.error(err)
                res
                    .status(500)
                    .send({
                        message: 'Something went wrong'
                    })
            })
    } else {
        res
            .status(400)
            .send({
                message: "Please supply a valid username and password"
            })
    }
})

module.exports = router