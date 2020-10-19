const express = require('express');
const router = express.Router();

//in below requrest we are going to be returning html markup to the client.

router.get('/', (req, res) => {
    res.render('index', {title: 'My Express App', message: 'Hello'});
});

module.exports = router;