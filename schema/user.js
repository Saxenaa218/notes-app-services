var mongoose = require('mongoose');
var Schema = mongoose.Schema,

ObjectId = Schema.ObjectId;
var myuser = new Schema({
    title :String,
    desc :String,
    last_updated :String
});

module.exports = mongoose.model('personal', myuser);
