const mongoose=require('mongoose');
const {Schema,model}=mongoose;

const CommunityImagesSchema= new Schema({
    imagelink:{
        type:String,
        required:true,
        
    },
    prompt:{
        type:String,
        required:true,
    }
})

const CommunityImages=model('CommunityImages',CommunityImagesSchema);
module.exports=CommunityImages;