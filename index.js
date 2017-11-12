const path = require('path');
const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
// const db = require('./db');
const PORT = process.env.PORT || 1337;
require('dotenv').config()
const app = express();
const server = app.listen(PORT, () => console.log(`Feeling chatty on port ${PORT}`));

module.exports = app;

// db.sync().then(() => console.log('Database is synced'));

// logging middleware
app.use(morgan('dev'));

app.use(cors('*'))

// body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 'API' routes
// app.use('/api', require('./api'));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', require('./server/api/cloud'))

// static middleware

// 404 middleware
app.use((req, res, next) =>
  path.extname(req.path).length > 0 ?
    res.status(404).send('Not found') :
    next()
);

// send index.html
app.use('*', (req, res, next) =>
  res.sendFile(path.join(__dirname, '..', 'public/index.html'))
);

// error handling endware
app.use((err, req, res, next) =>
  res.status(err.status || 500).send(err.message || 'Internal server error.')
);
// server()
// const API_KEY = 'AIzaSyDXwcoDfCkDCScAfKYAYQo3lFL4-3h1jy0'
//
// function previewFile() {
//   var preview = document.querySelector('img') //selects the query named img
//   var file = document.querySelector('input[type=file]').files[0] //sames as here
//   var reader = new FileReader()
//
//   reader.onloadend = function() {
//     preview.src = reader.result
//   }
//   if (file) {
//     reader.readAsDataURL(file) //reads the data as a URL
//     console.log(reader.readAsDataURL(file))
//   } else {
//     preview.src = ''
//   }
// }
//
// previewFile() //calls the function named previewFile()
