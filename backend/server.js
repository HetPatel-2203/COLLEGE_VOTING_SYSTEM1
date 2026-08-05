const express=require("express");
const cors=require("cors");
const dotenv=require("dotenv");
const multer=require("multer");
const path=require("path");

dotenv.config();

const connectDB=require("./config/db");

connectDB();

const User=require("./models/User");
const Event=require("./models/Event");
const Vote=require("./models/Vote");
const Notification=require("./models/Notification");
const Department=require("./models/Department");
const Attendance=require("./models/Attendance");

const app=express();

app.use(cors());
app.use(express.json());

app.use(
"/uploads",
express.static(
path.join(__dirname,"uploads")
)
);

/* Upload */

const storage=

multer.diskStorage({

destination:(req,file,cb)=>{

cb(null,"uploads/");

},

filename:(req,file,cb)=>{

cb(

null,

Date.now()

+

path.extname(

file.originalname

)

);

}

});

const upload=

multer({

storage

});


/* Home */

app.get("/",(req,res)=>{

res.send(

"College Event Voting Running"

);

});


/* Register */

app.post(

"/register",

async(req,res)=>{

try{

const emailCheck=

await User.findOne({

email:req.body.email

});

if(emailCheck){

return res.json({

success:false,

msg:"Email Already Exists"

});

}



const rollCheck=

await User.findOne({

rollno:req.body.rollno

});

if(rollCheck){

return res.json({

success:false,

msg:"Roll Number Already Exists"

});

}



await User.create({

name:req.body.name,

email:req.body.email,

password:req.body.password,

rollno:req.body.rollno,

department:req.body.department

});



res.json({

success:true,

msg:"Registered Successfully"

});

}

catch(err){

console.log(err);

res.json({

success:false,

msg:"Register Error"

});

}

});


/* Login */

app.post(

"/login",

async(req,res)=>{

try{

const user=

await User.findOne({

email:

req.body.email

});

if(!user){

return res.json({

success:false,

msg:

"User Not Found"

});

}

if(

user.password !==

req.body.password

){

return res.json({

success:false,

msg:

"Wrong Password"

});

}

res.json({

success:true,

msg:"Login Successful",

user

});
}

catch(err){

console.log(err);

res.json({

success:false,

msg:

"Login Error"

});

}

});

/* Department */

app.post(

"/department",

async(req,res)=>{

try{

await Department.create({

name:

req.body.name,

totalStudents:

req.body.totalStudents

});

res.json({

msg:

"Department Added"

});

}

catch{

res.json({

msg:

"Department Exists"

});

}

});


app.get(

"/departments",

async(req,res)=>{

const data=

await Department.find();

res.json(data);

});


/* Get All Students */

app.get("/students", async(req,res)=>{

try{

const students = await User.find().select("-password");

res.json(students);

}
catch(err){

console.log(err);

res.json([]);

}

});

/* Event Add */

app.post(
"/event",
upload.single("poster"),
async(req,res)=>{

try{

if(
!req.body.eventName ||
!req.body.department ||
!req.body.date
){
return res.json({
success:false,
msg:"All Fields Required"
});
}

const imagePath =
req.file
?
`${req.protocol}://${req.get("host")}/uploads/` + req.file.filename
:
"";

await Event.create({

eventName:req.body.eventName,
department:req.body.department,
date:req.body.date,
poster:imagePath

});

await Notification.create({

title:"New Event",
message:req.body.eventName

});

res.json({

success:true,
msg:"Event Added Successfully"

});

}
catch(err){

console.log(err);

res.json({

success:false,
msg:"Event Add Error"

});

}

});



/* Get Events */

app.get(

"/events",

async(req,res)=>{

try{

const data = await Event.find();

res.json(data);

}

catch(err){

console.log(err);

res.json([]);

}

});

/* Edit Event */


app.put("/event/:id", async(req,res)=>{

try{

await Event.findByIdAndUpdate(
req.params.id,
{
eventName:req.body.eventName,
department:req.body.department,
date:req.body.date
}
);

res.json({
success:true,
msg:"Event Updated Successfully"
});

}
catch(err){

console.log(err);

res.json({
success:false,
msg:"Update Error"
});

}

});

/* Delete Event */

app.delete(

"/event/:id",

async(req,res)=>{

try{

await Event.findByIdAndDelete(

req.params.id

);

res.json({

success:true,

msg:"Deleted"

});

}

catch(err){

console.log(err);

res.json({

success:false,

msg:"Delete Error"

});

}

});


/* Vote */

app.post(

"/vote",

async(req,res)=>{

try{

const dep=

await Department.findOne({

name:

req.body.department

});

if(!dep){

return res.json({

msg:

"Department Not Found"

});

}



if(

dep.totalVotes

>=

dep.totalStudents

){

return res.json({

msg:

"Vote Limit Reached"

});

}



const check=

await Vote.findOne({

studentId:

req.body.studentId,

eventId:

req.body.eventId

});



if(check){

return res.json({

msg:

"Already Voted"

});

}



await Vote.create({

studentId:

req.body.studentId,

eventId:

req.body.eventId,

candidate:

req.body.candidate,

department:

req.body.department,

query:

req.body.query || ""

});



await Department.updateOne(

{

name:

req.body.department

},

{

$inc:{

totalVotes:1

}

}

);



res.json({

msg:

"Vote Submitted"

});

}

catch(err){

console.log(err);

res.json({

msg:

"Vote Error"

});

}

});

/* Attendance */

app.post(

"/attendance",

async(req,res)=>{

try{

const today=

new Date()

.toLocaleDateString();



const check=

await Attendance.findOne({

rollno:req.body.rollno,

date:today

});



if(check){

return res.json({

success:false,

msg:"Attendance Already Marked"

});

}



await Attendance.create({

studentId:req.body.studentId,

rollno:req.body.rollno,

name:req.body.name,

department:req.body.department,

eventName:req.body.eventName,

date:today

});



res.json({

success:true,

msg:"Attendance Marked"

});

}

catch(err){

console.log(err);

res.json({

success:false,

msg:"Attendance Error"

});

}

});

/* Notification */

app.get(

"/notifications",

async(req,res)=>{

const data=

await Notification.find();

res.json(data);

});

app.get(

"/queries",

async(req,res)=>{

const data=

await Vote.find({

query:{

$ne:""

}

});

res.json(data);

});


/* Result */

app.get(

"/results",

async(req,res)=>{

const result=

await Vote.aggregate([

{

$group:{

_id:

"$department",

totalVotes:{

$sum:1

}

}

}

]);

res.json(result);

});




/* Profile  */ 


app.post(

"/profile-photo",

upload.single(

"photo"

),

async(req,res)=>{

try{

if(!req.file){
return res.json({
success:false,
msg:"Please Select Image"
});
}

const imagePath =
`${req.protocol}://${req.get("host")}/uploads/` +
req.file.filename;

await User.findByIdAndUpdate(

req.body.userId,

{

photo:imagePath

}

);

res.json({

success:true,

msg:"Photo Updated",

photo:imagePath

});

}

catch(err){

console.log(err);

res.json({

success:false,

msg:"Upload Error"

});

}

});


const PORT=

process.env.PORT || 5001;

app.listen(

PORT,

"0.0.0.0",

()=>{

console.log(

"Server Running"

);


});

/* Get Attendance */

app.get("/attendance", async(req,res)=>{

try{

const data = await Attendance.find();

res.json(data);

}
catch(err){

console.log(err);

res.json([]);

}

});

