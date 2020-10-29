const express = require('express');
const app = express();
const UsersRoutes = require('./routes/Users_routes')
const CoursesRoutes = require('./routes/Courses_routes')
const bodyParser = require('body-parser')

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
app.use(bodyParser.json())
app.use('/user',UsersRoutes)
app.use('/courses',CoursesRoutes)
app.set("json spaces",2)

module.exports = app;