const express = require('express');
const app = express();
// the app constant represents our application


app.get('/', (req, res) => {
    res.send('hello world');
});

app.get('/api/courses', (req,res) => {
    res.send('sup piggy');
});

app.listen(3000, () => console.log('listnening on port 3000'));
