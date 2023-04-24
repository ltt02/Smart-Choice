const app = require('./app');
const config = require('./app/config/config');
const MongoDB = require('./app/utils/mongodb.util');
const mongoose = require('mongoose');

async function startServer() {
    try {
        await MongoDB.connect(config.db.uri);
        console.log('Connected to the database!');

        const PORT = config.app.port;
        app.listen(PORT, () => {
            console.log(`Server is running on ${PORT}.`);
        });
    } catch (error) {
        console.log('Cannot connect to the database!', error);
        process.exit();
    }
};
startServer();

// const db = require("./app/models");

// db.mongoose
//     .connect(config.db.uri)
//     .then(() => {
//         console.log("Connected to the database!");
//     })
//     .catch((error) => {
//         console.log("Cannot connect to the database!", error);
//         process.exit();
//     });

// const user = new db.User({
//     username: 'John Doe',
//     email: 'johndoe@example.com',
//     password: 'password123',
//     shippingAddress: {
//         street: '123 Main St',
//         city: 'Anytown',
//         state: 'CA',
//         zip: '12345',
//         country: 'USA'
//     }
// });

// user.save()
//     .then((user) => {
//         console.log('User saved:', user);

//         // Retrieve the user from the database
//         return db.User.findOne({ email: 'johndoe@example.com' });
//     })
//     .then((user) => {
//         console.log('User retrieved:', user);

//         // Disconnect from the database
//         return mongoose.disconnect();
//     })
//     .catch((err) => {
//         console.error(err);
//         mongoose.disconnect();
//     });

// const PORT = config.app.port;
// app.listen(PORT, () => {
//     console.log(`Server is running on ${PORT}.`);
// });