const express = require('express');
const books = require('./bookdb.js');
const publicUser = express.Router()
const doExist = require('./auth_users').doExist;
const users = require('./auth_users').users;


//Register Users
publicUser.post("/register", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (!doExist(username)) {
        users.push({
            'username': username,
            'password': password
        })
        return res.status(200).json({ message: "User Registered" })
    } else {
        return res.status(403).json({ message: "User already exist" })
    }
})

//Get all books
publicUser.get("/", async (req, res) => {
    try {
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Get book by ISBN
publicUser.get("/isbn/:isbn", async (req, res) => {
    try {
        const isbn = req.params.isbn;
        const book = books[isbn];
        if (book) {
            res.status(200).json(book);
        } else {
            res.status(404).json({ message: "Book not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Get book by author
publicUser.get("/author/:author", async (req, res) => {
    try {
        const author = req.params.author;
        const filteredBooks = Object.values(books).filter(book => book.author === author);
        if (filteredBooks.length > 0) {
            res.status(200).json(filteredBooks);
        } else {
            res.status(404).json({ message: "No books found by this author" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Get book by title
publicUser.get("/title/:title", async (req, res) => {
    try {
        const title = req.params.title;
        const filteredBooks = Object.values(books).filter(book => book.title === title);
        if (filteredBooks.length > 0) {
            res.status(200).json(filteredBooks);
        } else {
            res.status(404).json({ message: "No books found with this title" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Get book reviews by ISBN
publicUser.get("/review/:isbn", async (req, res) => {
    try {
        const isbn = req.params.isbn;
        const book = books[isbn];
        if (book && book.reviews) {
            res.status(200).json(book.reviews);
        } else {
            res.status(404).json({ message: "No reviews found for this book" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports.general = publicUser;