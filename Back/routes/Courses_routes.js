const express = require('express');
const { getLolilol, getCourses, getAllCourses } = require('../Controllers/Courses_controller');
const router2 = express.Router();
const CoursesController = require('../Controllers/Courses_controller')

router2.route('/all')
    .get(getAllCourses)
    .post()

router2.route('/:courseType')
    .get(getCourses)

    module.exports = router2