const ApiError = require("../api-error");
const CartModel = require("../models/cart.model");
const MongoDB = require("../utils/mongodb.util");

exports.create = async (req, res, next) => {
    try {
        const cartModel = new CartModel(MongoDB.client);
        const document = await cartModel.create(req.body);
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "An error occured while creating the cart")
        );
    }
};

exports.getAllProducts = async (req, res, next) => {
    let products = [];
    try {
        const cartModel = new CartModel(MongoDB.client);
        products = await cartModel.getCartList(req.params.id);
    } catch (error) {
        return next(new ApiError(500, 'An error occured while retrieving products!'))
    }
    console.log(products);
    return res.send(products);
};

exports.addToCart = async (req, res, next) => {
    if (!req.body?.cartId) {
        return next(new ApiError(400, "Cart ID can not be empty"));
    }
    try {
        const cartModel = new CartModel(MongoDB.client);
        const document = await cartModel.addToCart(req.body.cartId, req.body.productId);
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "An error occured while adding product to cart")
        );
    }
};

exports.removeFromCart = async (req, res, next) => {
    if (!req.body?.cartId) {
        return next(new ApiError(400, "Cart ID can not be empty"));
    }
    try {
        const cartModel = new CartModel(MongoDB.client);
        const document = await cartModel.removeFromCart(req.body.cartId, req.body.productId);
        console.log(document);
        return res.send({ message: "Product was removed successfully from cart" });
    } catch (error) {
        return next(
            new ApiError(500, `Could not delete product with id=${req.body.productId} from cart`)
        );
    }
};