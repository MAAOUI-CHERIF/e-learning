const express = require('express');
const app = express();
const routes = require('./routes/Users_routes')
const bodyParser = require('body-parser')


app.use(bodyParser.json())
app.use(express.static('../Client'));

app.use('/', routes)

module.exports = app;