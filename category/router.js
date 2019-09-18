const express = require('express')
const Category = require('./model.js')
const Word = require('../word/model')
const router = express.Router()
const auth = require('../auth/middleware')

router.post('/category',  (req, res, next) => {
    Category
        .create(req.body)
        .then(word => res.status(201).json(word))
        .catch(err => { next(err) })
})

router.get('/category/:id', auth, (req, res, next) => {
    Word
        .findAll({
            where: { categoryId: req.params.id }
        })
        .then(word => { res.json({ words: word }) })
        .catch(next)
})

router.get('/category/', auth, (req, res, next) => {
    Category
        .findAll()
        .then(category => { res.json({ categories: category }) })
        .catch(next)
})

module.exports = router