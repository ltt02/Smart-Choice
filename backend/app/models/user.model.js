const { ObjectId } = require('mongodb');
const bcrypt = require('bcrypt');

class UserModel {
    constructor(client) {
        this.User = client.db().collection("user");
    }

    extractUserData(payload) {
        const user = {
            username: payload.username,
            email: payload.email,
            password: bcrypt.hashSync(payload.password, 8),
            shippingAddress: payload.shippingAddress,
            cartId: payload.cartId,
        }
        return user;
    }

    async getUser(_username) {
        return await this.User.findOne({
            username: _username,
        });
    }

    // email must be different 
    async create(payload) {
        const user = this.extractUserData(payload);
        const result = await this.User.insertOne(user);
        return result;
    }

    async find(filter) {
        const cursor = await this.User.find(filter);
        return await cursor.toArray();
    }

    async findByName(name) {
        return await this.find({
            name: { $regex: new RegExp(name), $options: "i"},
        });
    }

    async updateCartInfo(_username, _cartId) {
        const user = await this.getUser(_username);
        const result = await this.User.findOneAndUpdate(
            user,
            { $set: { cartId: _cartId } },
            { returnDocument: "after", upsert: true }
        );
        return result.value;
    }

    async updateRefreshToken(_username, _refreshToken) {
        try {
            const user = await this.getUser(_username);
            const result = await this.User.findOneAndUpdate(
                user,
                { $set: { refreshToken: _refreshToken } },
                { returnDocument: "after", upsert: true }
            );
            return result.value;
        } catch (error) {
            return error;
        }
    }

    async getUserId(_username) {
        const options = {
            projection: {
                _id: 1,
            }
        };
        const result = await this.User.findOne({
            username: _username,
            options
        });
        return result;
    }
}

module.exports = UserModel;