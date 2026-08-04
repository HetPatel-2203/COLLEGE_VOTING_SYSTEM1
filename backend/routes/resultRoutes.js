const router=
require("express")
.Router();

const Vote=
require("../models/Vote");


router.get(

"/results",

async(req,res)=>{

const result=

await Vote.aggregate([

{

$group:{

_id:
"$candidate",

totalVotes:{

$sum:1

}

}

},

{

$sort:{

totalVotes:-1

}

}

]);

res.json(result);

}

);

module.exports=
router;