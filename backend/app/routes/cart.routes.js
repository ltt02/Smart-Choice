const express = require('express');
const cart = require('../controllers/cart.controller');

const router = express.Router();

router.route("/")
    .post(cart.addToCart)
    .delete(cart.removeFromCart)
// .put(cart.update)
router.route("/:id")
    .get(cart.getAllProducts)

module.exports = router;