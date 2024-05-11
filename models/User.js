const mongoose=require('mongoose');
const {Schema,model}=mongoose;

const UserSchema= new Schema({
    username:{
        type:String,
        required:true,
        min:4,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true
    },
    uniqueString:{
        type:String,
        required:true
    },
    isValid:{
        type:Boolean,
        default:false
    }
})

const User=model('User',UserSchema);
module.exports=User;