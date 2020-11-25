const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const { notFound,errorHandler } = require('./middleware');
const logs = require('./api/logs');
const app = express();

// connect to mongodb then we started the server
const port = process.env.PORT || 1337;
mongoose.connect(process.env.DATABASE_URL,{ useUnifiedTopology : true, useNewUrlParser : true })
  .then((result => app.listen(port,'localhost',() => console.log('Server started on port ' + port)) ))
  .catch(err => console.log(err));

// middleware
app.use(morgan('common'));
app.use(helmet());
app.use(cors({
  origin : process.env.CORS_ORIGIN,
}));
app.use(express.json());

// Routes
app.use('/api/logs',logs);

// not found middleware
app.use(notFound);
// error handling middleware
app.use(errorHandler);