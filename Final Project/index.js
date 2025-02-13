const express = require('express');
const session = require('express-session');
const jwt = require('jsonwebtoken');
const customers_routes = require('./routers/auth_users.js').authenticated;
const general_routes = require('./routers/general.js').general;

const app = express();

app.use(express.json());
app.use("/customer", session({ secret: 'mysecret', resave: true, saveUninitialized: true }));

app.use("/customer/auth/*", function auth(req, res, next) {
    if (req.session.authorization) {
        const token = req.session.authorization.accessToken;

        jwt.verify(token, 'access', (err, user) => {
            if (!err) {
                req.user = user;
                next();
            } else {
                res.status(403).json({ message: "User not authenticated" })
            }
        })
    } else {
        res.status(403).json({ message: "User not logged in" })
    }
});

app.use("/customer", customers_routes);
app.use("/", general_routes);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});