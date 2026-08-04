const router=
require("express")
.Router();

const Notification=

require(

"../models/Notification"

);


router.get(

"/notifications",

async(req,res)=>{

const data=

await Notification.find();

res.json(data);

}

);

module.exports=
router;