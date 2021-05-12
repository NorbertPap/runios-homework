const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config();
const db = require('./db/db');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/photos');

const app = express();

app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/photos', usersRouter);

app.listen(3000, () => {
    console.log('Server listening on port 3000')
});

module.exports = app;
