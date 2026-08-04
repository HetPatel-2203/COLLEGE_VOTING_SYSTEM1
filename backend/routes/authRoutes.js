const router=
require("express")
.Router();

const User=
require("../models/User");


router.post(

"/register",

async(req,res)=>{

await User.create(

req.body

);

res.json({

msg:
"Registered"

});

}

);


router.post(

"/login",

async(req,res)=>{

const user=

await User.findOne({

email:
req.body.email

});

if(!user){

return res.json({

msg:
"User Not Found"

});

}

if(

user.password

!=

req.body.password

){

return res.json({

msg:
"Wrong Password"

});

}

res.json({

user

});

}

);

module.exports=
router;