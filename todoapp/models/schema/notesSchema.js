const mongoose =require('mongoose');
const Schema=mongoose.Schema;
const noteSchema=new Schema({
    'userid':{
    type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    'name':{
        type:String,
        required:true,
        lowercase:true,
        minlength:3,
        maxlength:25,
        trim:true
    },
    'desc':{
        type:String,
        minlength:3,
        required:true
    },
    'status':{
        type:String,
        default:'pending'
    }
});
const NoteModel=mongoose.model('notes',noteSchema);
module.exports=NoteModel;