const { ObjectId } = require('mongodb');

class CartModel {
    constructor(client) {
        this.Cart = client.db().collection("cart");
    }

    extractCartData(payload) {
        const cart = {
            owner: payload._id,
            products: new Array(),
        }
        return cart;
    }

    async getCart(_cartId) {
        return await this.Cart.findOne({
            _id: new ObjectId(_cartId),
        });
    }

    async getCartList(_cartId) {
        const result = await this.Cart.findOne({
            _id: new ObjectId(_cartId),
        });
        return result.products;
    }

    async create(payload) {
        const cart = this.extractCartData(payload);
        const result = await this.Cart.insertOne(cart);
        return result;
    }

    async find(filter) {
        const cursor = await this.Product.find(filter);
        return await cursor.toArray();
    }

    async findById(id) {
        return await this.Cart.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async addToCart(_cartId, _productId) {
        const filter = {
            _id: ObjectId.isValid(_cartId) ? new ObjectId(_cartId) : null,
        };
        let qty = 1;

        const existingProduct = await this.Cart.findOne({
            _id: filter._id,
            'products._productId': _productId
        });
        if (existingProduct) {
            await this.Cart.findOneAndUpdate(
                {
                    _id: filter._id,
                    'products._productId': _productId
                },
                {
                    $inc: { 'products.$.qty': 1 }
                },
                { returnDocument: 'after' }
            );
        } else {
            await this.Cart.findOneAndUpdate(
                filter,
                { $push: { products: { _productId, qty } } },
                { returnDocument: 'after' }
            );
        }
        const updatedCart = await this.Cart.findOne(filter);
        return updatedCart;
    }

    async removeFromCart(_cartId, _productId) {
        // const filter = {
        //     _id: ObjectId.isValid(_cartId) ? new ObjectId(_cartId) : null,
        // };
        // console.log(filter);
        // return await this.Cart.findOneAndUpdate(
        //     filter,
        //     { $pull: { 'products': {_productId} }},
        //     { returnDocument: "after"}
        // );
        const filter = {
            _id: ObjectId.isValid(_cartId) ? new ObjectId(_cartId) : null,
            'products._productId': { $exists: true } // Check if product exists in cart
        };

        // Decrease the quantity of the product in the cart
        await this.Cart.findOneAndUpdate(
            filter,
            { $inc: { 'products.$.qty': -1 } },
            { returnDocument: 'after' }
        );

        // Retrieve the updated cart
        const updatedCart = await this.Cart.findOne(filter);

        // Check if the quantity of the product is now 0, and remove it from cart
        const productIndex = updatedCart.products.findIndex(
            (product) => product._productId === _productId
        );
        if (productIndex !== -1 && updatedCart.products[productIndex].qty === 0) {
            await this.Cart.findOneAndUpdate(
                filter,
                { $pull: { products: { _productId } } }
            );
        }

        // Return the updated cart
        return updatedCart;
    }
}

module.exports = CartModel;