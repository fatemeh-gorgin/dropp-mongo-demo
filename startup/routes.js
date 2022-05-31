const express = require('express')
const error = require('../middlware/error')
const genres = require('../routes/genres')
const customer = require('../routes/customer')
const users = require('../routes/users')
const auth = require('../routes/auth')
module.exports = function (app) {
    app.use(express.json())
    app.use('/api/genres', genres)
    app.use('/api/customer', customer)
    app.use('/api/users', users)
    app.use('/api/auth', auth)

    app.use(error)

}