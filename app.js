const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
const passport = require('passport');
const indexRouter = require('./routes/index');

const app = express();

//2312
app.use(cors());
app.options('*', cors());4
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize({}));
require("./config/passport")(passport);


app.use('/api', indexRouter);

module.exports = app;
