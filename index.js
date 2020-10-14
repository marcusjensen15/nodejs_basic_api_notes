const express = require('express');
const app = express();
// the app constant represents our application


app.get('/', (req, res) => {
    res.send('hello world!!!');
});

app.get('/api/courses', (req,res) => {
    res.send('sup piggy');
});

// :id could be literally anything. just needs to start with ac colon. params is a keyword.
app.get('/api/courses/:id', (req,res) => {
  res.send(req.params.id);
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

//PORT - enviornment variable.

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('listnening on port ' + port));
