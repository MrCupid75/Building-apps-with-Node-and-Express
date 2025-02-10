const express = require('express');
const router = express.Router();

let users = [
    {
        firstName: "John",
        lastName: "wick",
        email: "johnwick@gamil.com",
        DOB: "22-01-1990",
    },
    {
        firstName: "John",
        lastName: "smith",
        email: "johnsmith@gamil.com",
        DOB: "21-07-1983",
    },
    {
        firstName: "Joyal",
        lastName: "white",
        email: "joyalwhite@gamil.com",
        DOB: "21-03-1989",
    },
]

router.get("/", (req, res) => {
    res.send(JSON.stringify({ users }, null, 4))
});

router.get("/:email", (req, res) => {
    const email = req.params.email;
    const userFiltered = users.filter((user) => user.email === email);
    res.send(userFiltered)
})

router.post("/", (req, res) => {
    let newUser = {
        "firstName": req.query.firstName,
        "lastName": req.query.lastName,
        "email": req.query.email,
        "DOB": req.query.DOB
    }
    users.push(newUser)
    res.send(`User ${req.query.firstName} added`)
})

router.put("/:email", (req, res) => {
    const email = req.params.email;
    const userToUpdate = users.filter((user) => user.email === email);

    if (userToUpdate.length > 0) {

        if (req.query.firstName) {
            userToUpdate[0].firstName = req.query.firstName;
        }
        if (req.query.lastName) {
            userToUpdate[0].lastName = req.query.lastName;
        }
        if (req.query.email) {
            userToUpdate[0].email = req.query.email;
        }
        if (req.query.DOB) {
            userToUpdate[0].DOB = req.query.DOB;
        }
        users = users.filter((user) => user.email != email)
        users.push(userToUpdate[0])
    } else {
        console.log("User not found")

    }

    res.send(`User with ${email} updated`)
})

router.delete("/:email", (req, res) => {
    const deleteUserEmail = req.params.email;

    users = users.filter((user) => user.email !== deleteUserEmail)
    res.send(`User with emai: ${deleteUserEmail} deleted`)
})

module.exports = router;