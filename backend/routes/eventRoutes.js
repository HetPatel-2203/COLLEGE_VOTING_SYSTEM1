const router=
require("express")
.Router();

const Event=
require("../models/Event");


router.get(

"/events",

async(req,res)=>{

const data=

await Event.find({

status:"Approved"

});

res.json(data);

}

);

module.exports=
router;