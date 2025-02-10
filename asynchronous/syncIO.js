const fs = require("fs")

const filename1 = "coursedetails.json"
const filename2 = "sampleData.json"

function readFilename(filename) {
    const data = fs.readFileSync(filename)
    if (data) {
        console.log(data)
    } else {
        throw new Error("Data not found");
    }
}

console.log("File being red")
readFilename(filename1)
readFilename(filename2)
