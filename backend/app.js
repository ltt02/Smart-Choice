const express = require('express');
const cors = require('cors');

const app = express();
const productRouter = require('./app/routes/product.routes');
const authRouter = require('./app/routes/auth.routes');
const cartRouter = require('./app/routes/cart.routes');
const userRouter = require('./app/routes/user.routes');


const ApiError = require('./app/api-error');

app.use(cors());
app.use(express.json());

app.use('/api/products', productRouter);
app.use('/api/auth', authRouter);
app.use('/api/cart', cartRouter);
app.use('/api/users', userRouter);

app.get('/', (req, res) => {
    res.json({
        message: "Welcome to my web application." ,
    });
});

app.use((req, res, next) => {
    return next(new ApiError(404, 'Resource not found'));
});

app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).json({
        message: err.message || 'Internal Server Error',
    });
});

module.exports = app;