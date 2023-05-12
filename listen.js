const app = require("./app.js")

const { PORT = 9090 } = process.env
app.listen(PORT, () => {
    console.log(`NEWS Backend listening on ${PORT}`)
})