require("express-async-errors")
const mongoose = require('mongoose')
const winston = require('winston')

const express = require('express')
const app = express()

require('./startup/routes')(app);
require('./startup/db')();
require('./startup/logging')()
require('./startup/config')()
require('./startup/validation')()
// process.on('uncaughtException' , (ex) =>{
//     // console.log('we got folan exeption');
//     winston.error(ex.message , ex)
//     process.exit(1)
// })


// const p = Promise.reject(new Error('s th fail'));
// p.then(() => console.log('done'))

// throw new Error("something fail during start")


const port = process.env.PORT || 3000
app.listen(port , () => winston.info(`Listening on port ${port} ...`))
const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    category: {
        type: String,
        enum: ['web', 'mobile'],
        lowercase: true,
        trim: true
    },
    auther: String,
    tag: {
        type: Array,
        validate: {
            validator: function (v) {
                return v && v.length > 0
            },
            message: 'A course should have atleast one tag'
        }
    },
    price: {
        type: Number,
        required: function () { return this.isPublished; },
        min: 10,
        max: 200,
        get: v => Math.round(v),
        set: v => Math.round(v)
    },
    date: { type: Date, default: Date.now },
    isPublished: Boolean
})
const Course = mongoose.model('Course', courseSchema)
async function createCourse() {
    const course = new Course({
        name: 'anguler',
        auther: "fatemeh",
        category: "webb",
        tag: ["back"],
        price: 15.8,
        isPublished: true
    })
    try {
        const result = await course.save()
        console.log(result)
    }
    catch (ex) {
        for (field in ex.errors)
            console.log(ex.errors[field].message)
    }

}
async function getCourse() {
    const pageNumber = 10;
    const pageSize = 5;
    const course = await Course
        .find({ auther: "fatemeh", isPublished: true })
        // .find({price : {$gte :10 , $lte : 20}})
        // .find({price : {$in: [10 , 15 , 20]}})

        // .find()
        // .or([{auther: 'mosh'} , {isPublished: true}])

        //starts with fatemeh
        // .find({ auther: /^fatemeh/ })

        //end with gorgin
        // .find({ auther: /gorgin$/i })

        //contain fatemeh
        // .find({ auther: /.*fatemeh.*/i })
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        .sort({ name: 1 })
        .select({ name: 1, tag: 1 })
        .count()
    console.log(course)
}
async function updateCourse(id) {
    // const course =await Course.findById(id)
    // if(!Course) return;
    // course.isPublished = true;
    // course.auther = 'change'
    // const result = await course.save()
    // console.log(result)

    const course = await Course.findByIdAndUpdate(id, {
        $set: {
            auther: 'me',
            isPublished: true
        }
    }, { new: true })
    console.log(course)
}
async function deleteCourse(id) {
    const course = await Course.findByIdAndRemove(id)
    console.log(course)
}
// createCourse()

