const moongose = require('mongoose')
const customerSchema = new moongose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    isGold: {
        type: Boolean,
        default: false
    },
    phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
})
const Customer = moongose.model('Customer', customerSchema)

module.exports.Customer = Customer
