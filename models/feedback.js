const mongoose=require('mongoose');
const {Schema, model}=mongoose;
const FeedbackSchema=new Schema({
    name:{
        type:String,
        required:true,
        min:3
    },
    phone:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    feedbackmessage:{
        type:String,
        required:true
    },
    rating:{
        type:String,
        required:true
    }
})
const Feedback=model('Feedback',FeedbackSchema);
module.exports=Feedback;