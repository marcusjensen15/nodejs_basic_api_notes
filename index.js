//Set up instructions for various enviornments in all of the .json files.
const config = require('config');

const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const Joi = require('joi');
const app = express();
const logger = require('./middleware/logger');
const auth = require('./authenticate');

//below is loading all of our courses routes

const courses = require('./routes/courses');
const view = require('./routes/view');


//app.set('view engine', 'pug') is for templating engines (responses that return html markup). it doesn't need to be requried because express is internally loading this module. All views need to be in a folder called 'views' in the root of the app.

app.set('view engine', 'pug');
app.set('viewes', './views');

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

//below, we are telling express that for any route that starts with '/api/courses' use the courses module. 

app.use('/api/courses', courses);

app.use('/', view);


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

function validateCourse(course){
  const schema = Joi.object({ name: Joi.string().min(3).required()});
  return schema.validate(course);


};


//PORT - enviornment variable.

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('listnening on port ' + port));
