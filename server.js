const express = require('express');
const path = require('path');
require('dotenv').config();
const knex = require('./db/db');

const indexRouter = require('./routes/index');
const photosRouter = require('./routes/photos');

const app = express();

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/photos', photosRouter);

app.listen(3000, () => {
    console.log('Server listening on port 3000')
});

module.exports = app;
