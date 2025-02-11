const express = require('express')
const session = require('express-session')
const jwt = require('jsonwebtoken')

const app = express();
const PORT = 3000;

app.use(session({ secret: 'MYsecErTSessUib', resave: true, saveUninitialized: true }))
app.use(express.json())

//checking users array to see if user exist 
const doesExist = (username) => {

    const userAlreadyExist = users.filter((user) => user.username === username)

    if (userAlreadyExist.length > 0) {
        return true
    } else {
        return false
    }
}

const authenticatedUser = (username, password) => {

    const validatedUser = users.filter((user) => {
        return (user.username === username && user.password === password)
    })

    if (validatedUser.length > 0) {
        return true
    } else {
        return false
    }
}

app.post("/register", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    //check for provided details
    if (username && password) {
        // check if user is already registered
        if (!doesExist(username)) {
            users.push({ "username": username, "password": password })
            return res.status(200).json({ message: "user successfully registered. Now you can login in" })
        } else {
            return res.status(404).json({ message: "user already exists!" })
        }
    }

    return res.status(404).json({ message: "Unable to register user. Please provide username and password" })
})

app.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
        return res.status(403).json({ message: "Error logging in: Please provide correct username and password" })
    }

    //check if user has registered
    if (!authenticatedUser(username, password)) {
        let accesstoken = jwt.sign(
            { data: password },
            'access',
            { expiresIn: 60 * 60 }
        )

        req.session.authorization = { accesstoken, username }

        return res.status(200).json({ message: "User successfully logged in" })

    } else {
        res.status(403).json({ message: "user not registered" })
    }
})

app.use("/friends", (req, res, next) => {

    if (req.session.authorization) {

        let token = req.session.authorization["acesstoken"]

        jwt.verify(token, 'access', (err, user) => {
            if (!err) {
                req.user = user
                next()
            } else {
                return res.status(403).json({ message: "User not authenticated" })
            }
        });
    } else {
        return res.status(403).json({ message: "User not logged in" })
    }
})

app.use("/friends", routes)

app.listen(PORT, console.log("Server is running"))
