const router=
require("express")
.Router();

const Certificate=

require(

"../models/Certificate"

);


router.get(

"/certificate",

async(req,res)=>{

const data=

await Certificate.find();

res.json(data);

}

);

module.exports=
router;