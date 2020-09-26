var express = require('express')
var app = express()

app.get('/get', (req, resp) => {
    resp.send({ data: "Hello World" })
})

app.get('/', (req, resp) => {
    resp.send({ data: "Welcome Home" })
})

app.listen(process.env.PORT || 3001)
