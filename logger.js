function log(req, res, next) {

  console.log('logging...');
  next();

}

module.exports = log;

//seperating concerns by moving this function into logger.js
