const winston = require('winston')
const mongoose = require('mongoose')
module.exports = function () {
    mongoose.connect('mongodb://localhost/vidly')
        .then(() => winston.info('connect to mongoDB '))
        .catch(err => console.err('could not connect', err.message))
}