const moongose = require('mongoose');
const express = require('express');
// const { default: mongoose } = require('mongoose');
const router = express.Router()

const genresSchema = new moongose.Schema({
    name:{
        type : String , 
        required : true,
        minlength : 5 ,
        maxlength : 50
    }
})
const Genre = moongose.model('Genre' , genresSchema)

router.get('/' , async (req , res) => {
    const genres = await Genre.find().sort('name')
    res.send(genres)
})

router.post('/' , async (req , res) =>{
    let genres = new Genre({
        name : req.body.name
    })
    genres = await genres.save()
    res.send(genres)
})
module.exports = router;