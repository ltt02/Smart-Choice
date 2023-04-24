const ApiError = require("../api-error");
const UserModel = require('../models/user.model');
const CartModel = require('../models/cart.model');
const MongoDB = require("../utils/mongodb.util");
const bcrypt = require('bcrypt');
const config = require('../config/config');
const authMethod = require('../methods/auth.method');
const randToken = require('rand-token');
const jwt = require('jsonwebtoken');
const { ObjectId } = require("mongodb");

exports.register = async (req, res, next) => {
    if (!req.body?.username) {
        return next(new ApiError(400, "Username can not be empty"));
    }
    try {
        const userModel = new UserModel(MongoDB.client);
        const cartModel = new CartModel(MongoDB.client);
        const username = req.body.username.toLowerCase();
        const user = await userModel.getUser(username);
        if (user) {
            return next(new ApiError(409, "Username already existed!"));
        }
        else {
            const createdUser = await userModel.create(req.body);
            if (!createdUser) {
                return next(new ApiError(400, "An error occured while register!"));
            }
			const cartOwner = await userModel.getUser(username);
			const cart = await cartModel.create(cartOwner._id);
			const result = await userModel.updateCartInfo(username, cart.insertedId);
            return res.send(createdUser);
        }
    } catch (error) {
        return next(new ApiError(500, "An error occured when register!"));
    }
};

exports.login = async (req, res, next) => {
	const userModel = new UserModel(MongoDB.client);
	const username = req.body.username.toLowerCase();
	const password = req.body.password;
	const user = await userModel.getUser(username);
	if (!user) {
		return next(new ApiError(401, "Username does not exist"));
	}
	const isPasswordValid = bcrypt.compareSync(password, user.password);
	if (!isPasswordValid) {
		return next(new ApiError(401, "Password is wrong"));
	}

	const accessTokenLife = config.auth.expired;
	const accessTokenSecret = config.auth.secretKey;

	const dataForAccessToken = {
		username: user.username,
	};
	const accessToken = await authMethod.generateToken(
		dataForAccessToken,
		accessTokenSecret,
		accessTokenLife,
	);

	if (!accessToken) {
		return next(new ApiError(401, "Login failed!!!!"));
	}

	let refreshToken = randToken.generate(30); // tạo 1 refresh token ngẫu nhiên 
	if (!user.refreshToken) {
		// Nếu user này chưa có refresh token thì lưu refresh token đó vào database
		await userModel.updateRefreshToken(user.username, refreshToken);
	} else {
		// Nếu user này đã có refresh token thì lấy refresh token đó từ database
		refreshToken = user.refreshToken;
	}

    return res.send({ 
        message: "Login success",
        accessToken,
		refreshToken,
		user,
    });
};

