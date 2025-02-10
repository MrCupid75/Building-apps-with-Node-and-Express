const axios = require('axios').default;

const connectUrl = (url) => {
    const req = axios.get(url);
    console.log(req)

    req.then(resp => {
        console.log("fullfilled")
    })
        .catch(error => {
            console.log("Rejected URL")
        })
}
