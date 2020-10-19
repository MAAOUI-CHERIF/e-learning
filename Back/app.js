const express = require('express');
const app = express();
const routes = require('./routes/routes')


app.use(express.static('../Client'));

app.use('/test', routes)

module.exports = app;