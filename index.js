//Set up instructions for various enviornments in all of the .json files.
const config = require('config');

const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const Joi = require('joi');
const app = express();
const logger = require('./logger');
const auth = require('./authenticate');


app.set('view engine', 'pug');

//a couple different debugging functions instead of just using 'console.log'

const dbDebugger = require('debug')('app:db');
const startupDebugger = require('debug')('app:startup');
// the app constant represents our application
//this app.use statement is middleware
//this express.json is built in middleware.

//configuration

console.log('Application Name ' + config.get('name'));
console.log('Mail Server ' + config.get('mail.host'));
console.log('Mail Server ' + config.get('mail.password'));



//line below returns the enviornment for this node application. You can set this variable.

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);

//below will return 'development' by default
console.log(`app: ${app.get('env')}`);


app.use(express.json());

//if you use this, you would send key value pairs in the x-www-form-urlencoded area of postman. the extended: true lets us pass arrays, objects, etc. not just strings/numbers
app.use(express.urlencoded( {extended:true}));

app.use(helmet());

//morgan used to log http requests

// app.use(morgan('tiny'));


//setting up different preferences depending on development enviornment

//set to different enviornment by running this: export NODE_ENV=production in the terminal.

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  startupDebugger('Morgan enabled...');
}

//DB Work ...

dbDebugger('Connected to the database....')

// this below lets us serve up static content. if you navigate to localhost:3000/readme.txt you will see the text in that file written to the dom.
app.use(express.static('public'));


//always use app.use when installing middleware. next is a reference to the next middleware function in the pipeline. you need the nex() method or your request will end up hanging

app.use(logger);
app.use(auth);


app.use
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
  if(!course) return res.status(404).send('the course with the given id was not found');
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


app.delete('/api/courses/:id', (req,res) => {
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

app.put('/api/courses/:id', (req,res) => {
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



function validateCourse(course){
  const schema = Joi.object({ name: Joi.string().min(3).required()});
  return schema.validate(course);


};


//PORT - enviornment variable.

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('listnening on port ' + port));
