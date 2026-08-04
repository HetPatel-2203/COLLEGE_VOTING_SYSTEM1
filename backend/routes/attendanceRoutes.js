const router=
require("express")
.Router();

const Attendance=

require(

"../models/Attendance"

);


router.post(

"/attendance",

async(req,res)=>{

await Attendance.create(

req.body

);

res.json({

msg:
"Attendance Marked"

});

}

);

module.exports=
router;