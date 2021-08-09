const express=require('express');
const router=express.Router();
const NoteModel=require('../models/schema/notesSchema');
const authenticate=require('../middleware/authenticate');

//create a note
router.post('/addnote',authenticate,async(req,res)=>{
    const {name,desc}=req.body
    try{
        const notedata=new NoteModel({
           userid:req.userID,
           name:name,
           desc:desc
        })
        const note=await notedata.save();
        if(note){
            res.status(201).json({message:"Note added Successfully"});
        }
    }catch(err){
        res.status(400).json({message:"Error in add note"})
    }
})

// Display note
router.get('/list',authenticate,async(req,res)=>{
    const data=await NoteModel.find({userid:req.userID},null,{sort:{'createdAt':-1}});
    res.status(200).json({message:data})
})

// update status of note
router.patch('/update/:id',async(req,res)=>{
    try{
        const id=req.params.id;
        const status=req.body.status;
        const data= await NoteModel.findByIdAndUpdate({_id:id},{status:status})
    if(data){
res.status(201).json({message:"note status updated successfully"})
    }
    else{
        res.status(400).json({message:"cannot find id and update"})
    }
    }catch(err){
        res.status(400).json({message:"Some error Occured"})
    }
   

})

router.delete('/delete/:id',async(req,res)=>{
    try{
        const id=req.params.id;
        const status=req.body.status;
        const data= await NoteModel.findByIdAndDelete({_id:id})
    if(data){
res.status(201).json({message:"note deleted successfully"})
    }
    else{
        res.status(400).json({message:"cannot find id and delete"})
    }
    }catch(err){
        res.status(400).json({message:"Some error Occured"})
    }
 
})
module.exports=router;