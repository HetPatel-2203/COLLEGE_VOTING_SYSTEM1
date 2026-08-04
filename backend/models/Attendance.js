const mongoose=require("mongoose");

const AttendanceSchema = new mongoose.Schema({

studentId:String,

rollno:String,

name:String,

department:String,

eventName:String,

date:String

});

module.exports=

mongoose.model(

"Attendance",

AttendanceSchema

);