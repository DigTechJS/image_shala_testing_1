const mongoose=require('mongoose');


const connectDB=async()=>{
    try{
        const connectionInstance=await mongoose.connect(`${process.env.MONGODB_URI}/imageshala`)
        console.log(`${connectionInstance.connection.host} connected successfully`);

    }
    catch(error){
        console.log("MONGODB connection error ", error);
        process.exit(1)
    }
}

module.exports=connectDB