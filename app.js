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
const { Schema } = mongoose
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
app.get('/get-notes', (req, resp) => {
  notesModel.find({}).then(data => {
    resp.send({ notes: data, error: false })
  })
  .catch(err => {
    resp.send({ notes: [], error: true })
  })
})

app.post('/save-note', (req, resp) => {
  let {title, desc} = req.body
  const notes = new notesModel({
    title,
    desc,
    // lastModified: new Date().toTimeString()
  })
  notes.save(error => {
    if (error) resp.send({status: "error"})
    else resp.send({status: "success", notes})
  })
})

app.post('/delete-note', (req, resp) => {
  notesModel.findByIdAndDelete(req.body.id, error => {
    if (error) resp.send({status: "error"})
    else resp.send({status: "success"})
  })
})

app.put("/update-note", (req, res) => {
  notesModel.findOneAndUpdate({ _id: req.body.id }, { ...req.body.changes }, (err, result) => {
    if (err) {
      res.send({status: "error"});
    } else {
      res.json({result});
    }
  });
})

app.listen(process.env.PORT || 3005)