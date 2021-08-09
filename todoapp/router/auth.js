const express=require('express');
const router=express.Router();
const bcrypt=require('bcrypt');
const userModel=require('../models/schema/userSchema');
router.post('/register',async(req,res)=>{
    try
    {
        const {name,email,password,phone}=req.body;
        console.log(req.body);
        if(!name || !email || !password || !phone){
            return res.status(400).json({error:"Please Enter all Details"});
        }
        const encryptPassword=bcrypt.hashSync(password,10);
const userdata= new userModel({
    name,email,password:encryptPassword,phone
})
const user =await userdata.save();
res.status(201).json({message:"Registered Successfully"});
console.log(user);
    }catch(err){
        console.log(`error ocurred ${err}`);
    }
})

router.post('/login',async(req,res)=>{
    const {email,password}=req.body;
    if(!email || !password){
     return  res.status(400).json({error:"Please Enter all field"});
    }
    try{
        const user= await userModel.findOne({email:email})
        if(!user){
res.status(400).json({error:"user with this email is not registered"})
        }
        else{
            const isMatched= bcrypt.compareSync(password,user.password);
            if(!isMatched){
res.status(400).json({error:"Invalid Credentials"})
            }
            else{
               const token= await user.generateAuthToken();   //generating token
               res.cookie('jwtoken',token,{
                   expires:new Date(Date.now()+ 86400000)   //expires in 1 day
               })
               console.log(token)
                res.status(201).json({message:"Login Successfully"})
            }
        }
    }catch(err){
        console.log(`Something went wrong ${err}`)
    }
    
})

router.get('/logout',(req,res)=>{
    res.clearCookie('jwtoken',{path:'/'})
    res.status(200).json({message:"User Logout Successfully"})
})
module.exports=router;