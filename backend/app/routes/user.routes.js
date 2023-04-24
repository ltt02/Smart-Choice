const express = require('express');
const user = require('../controllers/user.controller');

const router = express.Router();

router.route("/")
    .get(user.findAll)

module.exports = router;