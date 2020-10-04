import express from 'express'
import cors from 'cors'
import bodyParser from "body-parser"
import mongoose from 'mongoose'
import morgan from 'morgan'

let app = express()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())
app.use(morgan('tiny'))

const uri = "mongodb+srv://abhisheks:admin@cluster0.gr3w7.mongodb.net/personal?retryWrites=true&w=majority";

// schema defining
const Schema = mongoose.Schema
const notesSchema = new Schema({
  title: String,
  desc: String,
  lastModified: Number
})

// Model and will be used for CRUD operations
const notesModel = mongoose.model("notesModel", notesSchema)

// DB connection
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// checking connection
mongoose.connection.on('connected', () => {
  console.log("Connected to database")
})

// routes
app.get('/get-notes', async (req, resp) => {
  let response;
  await notesModel.find({}).then(data => {
    response = data
  })
  .catch(err => {
    response = []
  })
  resp.send({ notes: response })
})

app.post('/save-note', (req, resp) => {
  let {title, desc} = req.body
  const notes = new notesModel({
    title,
    desc,
    // lastModified: new Date().toTimeString
  })
  notes.save(error => {
    if (error) resp.send({status: "error"})
    else resp.send({status: "success"})
  })
})

app.delete('/delete', (req, resp) => {
  notesModel.findByIdAndDelete(req.body.id, error => {
    if (error) resp.send({status: "error"})
    else resp.send({status: "success"})
  })
})

app.listen(process.env.PORT || 3005)