const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Promise resolved")
    }, 6000);
}).then((succesMessage) => {
    console.log("From callback: " + succesMessage)
})

console.log("Before Callback")
console.log("After Callback")
