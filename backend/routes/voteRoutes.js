const router=
require("express")
.Router();

const Vote=
require("../models/Vote");


router.post(

"/vote",

async(req,res)=>{

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

await Vote.create(
req.body
);

res.json({

msg:
"Vote Submitted"

});

}

);

module.exports=
router;