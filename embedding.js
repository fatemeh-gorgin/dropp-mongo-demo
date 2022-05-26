const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String, 
  authors: [{
      type: authorSchema,
      required : true
  }]
}));

async function createCourse(name, authors) {
  const course = new Course({
    name, 
    authors
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}
async function updateAuthor(courseId){
    // const course = await Course.findById(courseId);
    // course.author.name = "fatemeh gorgin"
    // course.save()
    const course = await Course.update({ _id: courseId} ,{
        $set: {
            'author.name' : "update fatemeh"
        }
    } )
}

async function addAuthor(courseId , author){
    const course = await Course.findById(courseId)
    course.authors.push(author)
    course.save()
}
async function removeAuthor(courseId , authorId){
    const course = await Course.findById(courseId)
    const author = course.authors.id(authorId)
    author.remove()
    course.save()
}

// addAuthor("628f0cb855a7667464b9e770" , new Author({name : "add"}))
// createCourse('me', [
//     new Author({ name: 'Mosh' }) , 
//     new Author({name : 'ffff'})
// ]);
// updateAuthor("628f05efa20ceb87f2b16ec0")
removeAuthor("628f0cb855a7667464b9e770" , "628f0ce1dde871ab89eb83d7")