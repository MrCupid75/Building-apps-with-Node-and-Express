let prompt = require('prompt-sync')();
let fs = require('fs');

const methcall = new Promise((resolve, reject) => {
    let filename = prompt("What is the name of the file?");

    try {
        const data = fs.readFileSync(filename)
        resolve(data)
    } catch (error) {
        reject(error)
    }
}).then(
    (data) => { console.log(data) },
    (error) => { console.log(error) }
)

