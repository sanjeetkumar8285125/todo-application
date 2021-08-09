const mongoose=require('../connection');
const jwt=require('jsonwebtoken')
const Schema= mongoose.Schema;
const userSchema=new Schema({
name:{
    type:String,
    required:true,
    minLength:3
},
email:{
    type:String,
    required:true,
},
password:{
    type:String,
    required:true
},
phone:{
    type:Number,
    required:true,
},
tokens:[
    {
    token:{
        type:String,
        required:true
        }
}
    ]
},{timestamps:true})


userSchema.methods.generateAuthToken=async function(){
    try{
        let token=jwt.sign({_id:this._id},process.env.secretKey)
        this.tokens=this.tokens.concat({token:token});
        await this.save();
        return token;
    }catch(err){
console.log(err)
    }

}

const userModel=mongoose.model('USER',userSchema);
module.exports=userModel;