const express = require('express');
const {getUser, getAllUsers, createUser, deleteUser, updateUserEmail,updateUserPassword, checkUser,authenticatedToken } = require('../Controllers/Users_controller');

const router = express.Router();


router.route('/modif')
      .get(authenticatedToken,getUser)
      .post(authenticatedToken,updateUserEmail)
      .delete(authenticatedToken,deleteUser)

router.route('/modifPass')
      .post(authenticatedToken,updateUserPassword)

router.route('/all')
      .get()
      .post(createUser)

router.route('/login')
      .post(checkUser)

module.exports = router;

