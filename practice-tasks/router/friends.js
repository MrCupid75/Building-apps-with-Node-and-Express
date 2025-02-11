const express = require('express');
const { route } = require('../../CRUD-Basics/routes/users');
const router = express.Router()

let friends = {
    "johnsmith@gamil.com": { "firstName": "John", "lastName": "Doe", "DOB": "22-12-1990" },
    "annasmith@gamil.com": { "firstName": "Anna", "lastName": "smith", "DOB": "02-07-1983" },
    "peterjones@gamil.com": { "firstName": "Peter", "lastName": "Jones", "DOB": "21-03-1989" }
};

router.get("/", async (req, res) => {
    res.send(JSON.stringify(friends, null, 4))
})

router.get("/:email", async (req, res) => {
    const friendEmail = req.params.email
    res.send(JSON.stringify(friends[friendEmail], null, 4))
})

router.post("/", async (req, res) => {
    let newUserEmail = req.body.email;

    if (newUserEmail) {
        let newUser = {
            "firstName": req.body.firstName,
            "lastName": req.body.lastName,
            "DOB": req.body.DOB
        }
        friends[newUserEmail] = newUser;
    }

    res.send(`User ${req.body.firstName} has been added`)
})

// Update
router.put("/:email", async (req, res) => {
    const email = req.params.email;
    let friend = friends[email];

    if (friend) {
        if (req.body.firstName) {
            friend.firstName = req.body.firstName
        }
        if (req.body.lastName) {
            friend.lastName = req.body.lastName
        }
        if (req.body.DOB) {
            friend.DOB = req.body.DOB
        }
        friends[email] = friend;
        res.send(`User ${email} has been updated`)
    } else {
        res.send(`User ${email} not found`)
    }
})

router.delete("/:email", async (req, res) => {
    const emailDelete = req.body.email;

    if (emailDelete) {
        delete friends[emailDelete]
    }

    res.send(`User ${emailDelete} has been deleted`)
})

module.exports = router;