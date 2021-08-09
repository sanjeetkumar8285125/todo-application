const jwt=require('jsonwebtoken');
const userModel=require('../models/schema/userSchema');

const authenticate=async (req,res,next)=>{

try{
const token=req.cookies.jwtoken;
const verifyToken=jwt.verify(token,process.env.secretKey);
const rootuser=await userModel.findOne({_id:verifyToken._id,"tokens.token":token});
if(!rootuser){
    throw new Error("user not found");
}
req.token=token;
req.rootuser=rootuser;
req.userID=rootuser._id
next();
}
catch(err){
    res.status(401).send('Unauthorized:No token provided. First Sign In')
}
}
module.exports=authenticate;