const mongoose=require("mongoose");

const UserSchema=

new mongoose.Schema({

name:String,

email:String,

password:String,

rollno:{

type:String,

unique:true

},

department:String,

photo:String

});

module.exports=

mongoose.model(

"User",

UserSchema

);