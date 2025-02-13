const express = require('express');
const session = require('express-session');
const jwt = require('jsonwebtoken')
const regUser = express.Router();

const app = express()

const users = []

app.use(session({ secret: 'mySecret', resave: true, saveUninitialized: true }))
app.use(express.json())

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

//Register Users
regUser.post("/register", (req, res) => {
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
    } else {
        res.status(403).json({ message: "User not registered!" })
    }
})