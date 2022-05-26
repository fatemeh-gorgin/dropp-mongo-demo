const {Customer} = require('../models/customer')
const moongose = require('mongoose');
const express = require('express');
// const { default: mongoose } = require('mongoose');
const router = express.Router()

router.get('/', async (req, res) => {
    const customer = await Customer.find().sort('name')
    res.send(customer)
})

router.post('/', async (req, res) => {
    let customer = new Customer({
        name: req.body.name,
        phone : req.body.phone,
        isGold : req.body.isGold
    })
    customer = await customer.save()
    res.send(customer)
})
module.exports = router;