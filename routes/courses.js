//need to require express in this file as well:

const express = require('express');

//need to install express router 

const router = express.Router();

//moved below data from index.js to here

const courses = [
    { id:1, name: 'bill'},
    { id:2, name: "cliff"},
    { id:3, name: "biff"}
  ]


//we are now able to take the /api/courses out of all this code because in index.js we instructed that any request with that route is directed to this file.


router.get('/', (req,res) => {
    res.send(courses);
});

// :id could be literally anything. just needs to start with ac colon. params is a keyword.
router.get('/:id', (req,res) => {
  let course = courses.find( c => c.id === parseInt(req.params.id));
  //respond with 404 (not found)
  if(!course) return res.status(404).send('the course with the given id was not found');
  res.send(course);
});

//you can also add multiple paramaters. here i'm just returning the 'day' value.

// app.get('/test/:month/:day', (req,res) => {
//   res.send(req.params.day);
// });

//you can also provide query string parameters (beginning with a ?)

//if you type in localhost:5000/howdy/545/2332/sortBy=name it will return {"sortBy": "name"}

// app.get('/howdy/:id/:secondaryid', (req,res) => {
//   res.send(req.query);
// });


router.post('/', (req,res) => {
  const {error} = validateCourse(req.body);

  //if invalid, return 400

  if (error) return res.status(400).send(error.details[0].message);


    const course = {
      id: courses.length + 1,
      name: req.body.name
    };
    courses.push(course);
    res.send(course);
});


router.delete('/:id', (req,res) => {
  //look up course
  //if doesn't exist return 404

  let course = courses.find( c => c.id === parseInt(req.params.id));
  //if doesn't exist return 404
  if(!course) res.status(404).send('the course with the given id was not found');

  //delete

  const index = courses.indexOf(course);

  courses.splice(index,1);

  //return response

  res.send(course);


});

//update resources

router.put('/:id', (req,res) => {
  //look up courses


  let course = courses.find( c => c.id === parseInt(req.params.id));
  //if doesn't exist return 404
  if(!course) return res.status(404).send('the course with the given id was not found');


  //validate courses


  // const result = validateCourse(req.body);
  //below is an example of object destructuring. we are referring to the result.error as error;

  const {error} = validateCourse(req.body);

  //if invalid, return 400

  if (error) return res.status(400).send(error.details[0].message);


  //update courses

  course.name = req.body.name;

  //return updated course
  res.send(course);
});



module.exports = router;