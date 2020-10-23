const express = require('express');
const {getAllCourses, getUserCourses,deleteUserCourse,addUserCourse, getCoursesByType } = require('../Controllers/Courses_controller');
const router2 = express.Router();
const {authenticatedToken} = require('../Controllers/Users_controller')

router2.route('/all')
    .get(getAllCourses)
    .post()

router2.route('/UserCourses')
    .get(authenticatedToken,getUserCourses)

router2.route('/UserCourses/:id')
     .post(authenticatedToken,addUserCourse)
     .delete(authenticatedToken, deleteUserCourse)

router2.route('/all/:courseType')
    .get(getCoursesByType)

    module.exports = router2