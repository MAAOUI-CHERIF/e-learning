// Ici on va venir définir chaque route et ce qu'elle doivent renvoyer
const express = require('express');
const {getUser, getAllUsers, createUser, deleteUser, updateUser, checkUser } = require('../Controllers/Users_controller');
const router = express.Router();


router.route('/all/search/:id')
      .get(getUser)
      .post(updateUser)
      .delete(deleteUser)

router.route('/all')
    .get(getAllUsers)
    .post(createUser)

router.route('/login')
    .post(checkUser)

module.exports = router;

