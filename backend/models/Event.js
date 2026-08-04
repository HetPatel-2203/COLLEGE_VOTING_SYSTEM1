const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({

eventName:String,

department:String,

date:String,

poster:String

});

module.exports = mongoose.model("Event", EventSchema);