const winston = require('winston')
require('winston-mongodb');
require("express-async-errors")
module.exports = function(){
    winston.handleExceptions(
        new winston.transports.Console({colorize: true , prettyPrint: true}),
        new winston.transports.File({ filename: 'uncaughException.log' })
    )
    
    process.on('unhandledRejection', (ex) => {
        // console.log('we got folan rejection');
        // winston.error(ex.message , ex)
        // process.exit(1)
        throw ex
    })
    winston.add(winston.transports.File, { filename: 'logfile.log' })
    winston.add(winston.transports.MongoDB, {
        db: 'mongodb://localhost/vidly',
        level: 'info'
    })
}