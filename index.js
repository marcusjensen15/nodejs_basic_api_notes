const express = require('express');
const Joi = require('joi');
const app = express();
// the app constant represents our application
//this app.use statement is middleware
app.use(express.json());
const courses = [
  { id:1, name: 'bill'},
  { id:2, name: "cliff"},
  { id:3, name: "biff"}
]


app.get('/', (req, res) => {
    res.send('hello world!!!');
});

app.get('/api/courses', (req,res) => {
    res.send(courses);
});

// :id could be literally anything. just needs to start with ac colon. params is a keyword.
app.get('/api/courses/:id', (req,res) => {
  let course = courses.find( c => c.id === parseInt(req.params.id));
  //respond with 404 (not found)
  if(!course) res.status(404).send('the course with the given id was not found');
  res.send(course);
});

//you can also add multiple paramaters. here i'm just returning the 'day' value.

app.get('/test/:month/:day', (req,res) => {
  res.send(req.params.day);
});

//you can also provide query string parameters (beginning with a ?)

//if you type in localhost:5000/howdy/545/2332/sortBy=name it will return {"sortBy": "name"}

app.get('/howdy/:id/:secondaryid', (req,res) => {
  res.send(req.query);
});


app.post('/api/courses', (req,res) => {
    // we will validate with joi. good package for validation.
    const schema = Joi.object({ name: Joi.string().min(3).required()});

    const result = schema.validate(req.body);

    if (result.error){
      // respond with bad request 400

      res.status(400).send(result.error.details[0].message);
      return;
    }

    const course = {
      id: courses.length + 1,
      name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

//PORT - enviornment variable.

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('listnening on port ' + port));
