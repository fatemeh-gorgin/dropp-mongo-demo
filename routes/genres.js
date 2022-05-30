const asyncMiddleware = require('../middlware/async')
const auth = require('../middlware/auth')
const admin = require('../middlware/admin')
const { Genre, validate } = require('../models/genre')
const moongose = require('mongoose');
const express = require('express');
// const { default: mongoose } = require('mongoose');
const router = express.Router()

//وقتی ماژول express-async-errors  را نصب کردیم خودش میاد ارور های روت رو هندل میکنه و نیازی نیست به این صورت بنویسیم میتونیم مثل قبل بیاریم 
// router.get('/', asyncMiddleware (async (req , res) => {
//         const genres = await Genre.find().sort('name')
//         res.send(genres)
// }))

//فرمت قبل
router.get('/', async (req , res) => {
    throw new Error('could not get the genres')
    const genres = await Genre.find().sort('name')
    res.send(genres)
})

router.post('/', auth, asyncMiddleware(async (req, res) => {
    let genres = new Genre({
        name: req.body.name
    })
    genres = await genres.save()
    res.send(genres)
}))

router.delete('/:id', [auth, admin], async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.body.id)
    if (!genre) return res.status(404).send("not found genre!")
    res.send(genre)
})
module.exports = router;