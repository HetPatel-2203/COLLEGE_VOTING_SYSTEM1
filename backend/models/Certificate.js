const mongoose=
require("mongoose");

module.exports=
mongoose.model(

"Certificate",

new mongoose.Schema({

studentId:String,

eventId:String,

certificate:String

})

);