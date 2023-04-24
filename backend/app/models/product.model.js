const { ObjectId } = require('mongodb');

class ProductModel {
    constructor(client) {
        this.Product = client.db().collection("product");
    }

    extractProductData(payload) {
        const product = {
            name: payload.name,
            description: payload.description,
            category: payload.category,
            brand: payload.brand,
            price: payload.price,
            quantity: payload.quantity,
            salePercent: payload.salePercent,
            image: payload.image,
        }
        Object.keys(product).forEach(
            (key) => product[key] === undefined && delete product[key]
        );
        return product;
    }

    async create(payload) {
        const product = this.extractProductData(payload);
        const existingProduct = await this.Product.findOne(product);
        if (existingProduct) return;
        const result = await this.Product.insertOne(product);
        return result;
    }

    async find(filter) {
        const cursor = await this.Product.find(filter);
        return await cursor.toArray();
    }

    async findByName(name) {
        return await this.find({
            name: { $regex: new RegExp(name), $options: "i"},
        });
    }

    async findById(id) {
        return await this.Product.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractProductData(payload);
        const result = await this.Product.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after"}
        );
        return result.value;
    }

    async delete(id) {
        const result = await this.Product.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result.value;
    }

    async deleteAll() {
        const result = await this.Product.deleteMany({});
        return result.deletedCount;
    }
}

module.exports = ProductModel;