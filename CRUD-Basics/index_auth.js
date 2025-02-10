const express = require('express')
const session = require('express-session')
const routes = require('./routes/users.js')
const jwt = require('jsonwebtoken')

const app = express()
const PORT = 5000;

app.use(session({ secret: "fingerprint", resave: true, saveUninitialized: true }))
app.use(express.json())

app.post("/login", (req, res) => {
    const user = req.body.user;

    if (!user) {
        return res.status(404).json({ message: "Body Empty" })
    }

    let accessToken = jwt.sign({
        data: user
    }, 'access', { expiresIn: 60 * 60 });

    req.session.authorization = {
        accessToken
    }

    return res.status(200).send("User successfully logged in")
})


app.use("/users", (req, res, next) => {
    if (req.session.authorization) {
        let token = req.session.authorization['accessToken'];

        jwt.verify(token, "access", (err, user) => {
            if (!err) {
                req.user = user;
                next()
            } else {
                return res.status(403).json({ message: "user not authenticated" });
            }
        })
    } else {
        return res.status(403).json({ message: "User not loggged in" })
    }
})

app.use("/users", routes)


app.listen(PORT, () => console.log("Server is running on port: " + PORT))