const mongoose=require("mongoose");

module.exports =
mongoose.model(

"Notification",

new mongoose.Schema({

title:String,

message:String,

date:{
type:Date,
default:Date.now
}

})

);