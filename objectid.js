const mongoose = require('mongoose')
const objectid = new mongoose.Types.ObjectId()
console.log(objectid.getTimestamp())
const isValid = mongoose.Types.ObjectId.isValid('1234')
console.log(isValid)