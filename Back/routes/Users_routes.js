const express = require('express');
const {getUser, getAllUsers, createUser, deleteUser, updateUser, checkUser,authenticatedToken } = require('../Controllers/Users_controller');
const router = express.Router();


router.route('/all/:id')
      .get(authenticatedToken,getUser)
      .post(authenticatedToken,updateUser)
      .delete(authenticatedToken,deleteUser)

router.route('/all')
      .get()
      .post(createUser)

router.route('/login')
      .post(checkUser)

module.exports = router;

