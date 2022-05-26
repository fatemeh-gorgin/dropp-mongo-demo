const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/mongo-exercises')
    .then(() => console.log('connect to mongoDB '))
    .catch(err => console.err('could not connect', err.message))

const courseSchema = new mongoose.Schema({
    name: String,
    auther: String,
    tags: [String],
    date: Date,
    isPublished: Boolean,
    price: Number
})
const Course = new mongoose.model('Course', courseSchema)

async function createCourse() {
    const course = new Course({
        "_id": "5a6900fff467be65019a9001", "tags": ["angular", "frontend"], "date": "2018-01-24T21:56:15.353Z", "name": "Angular Course", "author": "Mosh", "isPublished": true, "price": 15, "__v": 0
    })
    const result = await course.save()
    console.log(result)
}
async function getCourse(){
    return await Course
    .find({ isPublished: true, tags: 'backend' })
    .sort({name : 1})
    .select({name : 1 , auther : 1})
}
getCourse()
