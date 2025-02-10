const firstPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("First Promise resolved")
    }, 3000);
})

const secondPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Second Promise resolved")
    }, 2000);
})

firstPromise.then((successMessage) => {
    console.log(successMessage)
    secondPromise.then((successMessage) => {
        console.log(successMessage)
    })
})

console.log("Before Call back")