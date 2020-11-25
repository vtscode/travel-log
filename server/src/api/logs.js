const router = require('express').Router();
const LogEntry = require('../models/LogEntry');

// eslint-disable-next-line no-unused-vars
router.get('/', async (req,res,next) => {
  try {
    const entries = await LogEntry.find();
    res.json(entries);
  } catch (error) {
    console.log(error,error.name);
    next(error);
  }
});
router.post('/',async(req,res,next) => {
  console.log(req.body);
  try {
    const logEntry = new LogEntry(req.body);
    const resp = await logEntry.save();
    res.json(resp);
  } catch (error) {
    console.log(error.name);
    if(error.name === 'ValidationError'){
      res.status(422); // unprocessable
    }
    next(error);
  }
});

module.exports = router;