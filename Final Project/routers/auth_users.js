const express = require('express');
const session = require('express-session');
const jwt = require('jsonwebtoken')
const regUser = express.Router();
const books = require('./bookdb.js');

const users = []

const doExist = (username) => {
    const alreadyExistUser = users.filter((user) => user.username === username);

    if (alreadyExistUser.length > 0) {
        return true
    } else {
        return false
    }
}

const validateUser = (username, password) => {
    const validUser = users.filter((user) => user.username === username && user.password === password)

    const bool = validUser.length ? true : false;

    return bool;

}

regUser.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
        return res.status(403).json({ message: "Please provide valid username and password" })
    }

    if (validateUser(username, password)) {

        const accessToken = jwt.sign(
            { data: password },
            'access',
            { expiresIn: 60 * 60 }
        )

        req.session.authorization = { accessToken }
        return res.status(200).json({ message: "User successfully logged in" })
    } else {
        return res.status(403).json({ message: "User not registered!" })
    }
})

// Add a book review
regUser.put("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const review = req.body.review;

    if (books[isbn]) {
        books[isbn].reviews = review;
        return res.status(200).json({ message: "Review added successfully" });
    } else {
        return res.status(404).json({ message: "Book not found" });
    }
});

//delete a book review
regUser.delete("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;

    if (books[isbn]) {
        delete books[isbn].reviews;
        return res.status(200).json({ message: "Review deleted successfully" });
    } else {
        return res.status(404).json({ message: "Book not found" });
    }
});


module.exports.authenticated = regUser;
module.exports.doExist = doExist;
module.exports.users = users;