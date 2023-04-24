const express = require('express');
const cart = require('../controllers/cart.controller');

const router = express.Router();

router.route("/")
    .get(cart.getAllProducts)
    .post(cart.addToCart)
    .delete(cart.removeFromCart)
    // .put(cart.update)

module.exports = router;