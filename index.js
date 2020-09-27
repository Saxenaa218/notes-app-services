var express = require('express')
var app = express()

app.get('/get', (req, resp) => {
    resp.send({ data: "Hello World" })
})

app.get('/get-notes', (req, resp) => {
    var notes = [
        {
            title: "new one",
            desc: "added dummy text"
        }
    ]
    resp.send({ notes: notes })
})

app.listen(process.env.PORT || 3001)
