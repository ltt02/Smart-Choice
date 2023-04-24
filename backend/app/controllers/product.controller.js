const ApiError = require("../api-error");
const ProductModel = require("../models/product.model");
const MongoDB = require("../utils/mongodb.util");

exports.create = async (req, res, next) => {
    if (!req.body?.name) {
        return next(new ApiError(400, "Name can not be empty"));
    }
    try {
        const productModel = new ProductModel(MongoDB.client);
        const document = await productModel.create(req.body);
        if (!document) {
            return next(new ApiError(400, "Product is existed!!!"));
        }
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "An error occured while creating the product")
        );
    }
};

exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        const productModel = new ProductModel(MongoDB.client);
        const { name } = req.query;
        console.log(name);
        if (name) {
            documents = await productModel.findByName(name);
        }
        else documents = await productModel.find({});
    } catch (error) {
        return next(new ApiError(500, 'An error occured while retrieving products!'))
    }
    console.log(documents);
    return res.send(documents);
};

exports.deleteAll = (req, res) => {
    res.send({ message: "deleteAll handler"});
};

exports.findOne = async (req, res, next) => {
    try {
        const productModel = new ProductModel(MongoDB.client);
        const document = await productModel.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, 'Product not found'));
        }
        return res.send(document);
    } catch (error) {
        return next(new ApiError(500, `Error retrieving product with id=${req.params.id}`));
    }
};

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Data to update can not be empty"));
    }
    try {
        const productModel = new ProductModel(MongoDB.client);
        const document = await productModel.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, "Product not found"));
        }
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, `Error updating product with id=${req.params.id}`)
        );
    }
};

exports.delete = async (req, res, next) => {
    try {
        const productModel = new ProductModel(MongoDB.client);
        const document = await productModel.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Product not found"));
        }
        return res.send({ message: "Product was deleted successfully" });
    } catch (error) {
        return next(
            new ApiError(500, `Could not delete Product with id=${req.params.id}`)
        );
    }
};

exports.deleteAll = async (req, res, next) => {
    try {
        const productModel = new ProductModel(MongoDB.client);
        const deletedCount = await productModel.deleteAll();
        return res.send({
            message: `${deletedCount} products were deleted successfully`,
        });
    } catch (error) {
        return next(
            new ApiError(500, "An error occured while removing all products")
        );
    }
};