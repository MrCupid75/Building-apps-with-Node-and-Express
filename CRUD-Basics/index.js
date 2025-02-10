const express = require('express');
const routes = require('./routes/users.js')

const app = express()
const PORT = 3000;

app.use(express.json())
app.use("/users", routes)

app.listen(PORT, () => {
    console.log("Server is listening on PORT: ", PORT)
})