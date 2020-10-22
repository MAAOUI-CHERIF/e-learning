const express = require('express');
const {getCourses, getAllCourses, getUserCourses } = require('../Controllers/Courses_controller');
const router2 = express.Router();
const {authenticatedToken} = require('../Controllers/Users_controller')
router2.route('/all')
    .get(getAllCourses)
    .post()

router2.route('/UserCourses')
    .post(authenticatedToken)

router2.route('/all/:courseType')
    .get(getCourses)

    module.exports = router2