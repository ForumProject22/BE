import express from 'express'
const app = express()

const port = 5000

app.listen(port, () => {
    console.log(`app is running on port ${port}`)
})
console.log("hello World")