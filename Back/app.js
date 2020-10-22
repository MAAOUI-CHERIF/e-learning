const express = require('express');
const app = express();
const UsersRoutes = require('./routes/Users_routes')
const CoursesRoutes = require('./routes/Courses_routes')
const bodyParser = require('body-parser')


app.use(bodyParser.json())
app.use(express.static('../Client'));
app.use('/user',UsersRoutes)
app.use('/courses',CoursesRoutes)
app.set("json spaces",2)

module.exports = app;