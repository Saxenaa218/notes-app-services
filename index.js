var express = require('express')
var cors = require('cors')
var app = express()

app.use(cors())

app.get('/get', (req, resp) => {
    resp.send({ data: "Hello World" })
})

app.get('/get-notes', (req, resp) => {
    var notes = [
        {
            title: "first one",
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged"
        },
        {
            title: "second one",
            desc: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose"
        }
    ]
    resp.send({ notes: notes })
})

app.listen(process.env.PORT || 3001)
