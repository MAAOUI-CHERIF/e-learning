// Ici on va venir définir chaque route et ce qu'elle doivent renvoyer
const express = require('express');
const { getUnicorn, getPoney, getUnicornId } = require('../Controllers/test_controller');
const router = express.Router();
const controller = require('../Controllers/test_controller')

router.route('/licorne')
      .get(getUnicorn)

router.route('/poney')
    .get(getPoney)

router.route('/licorne/:licorneid')
    .get(getUnicornId)

module.exports = router;

