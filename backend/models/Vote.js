const mongoose=require("mongoose");

const voteSchema=

new mongoose.Schema({

studentId:String,

eventId:String,

candidate:String,

department:String,

query:String,

createdAt:{

type:Date,

default:Date.now

}

});

module.exports=

mongoose.models.Vote ||

mongoose.model(

"Vote",

voteSchema

);