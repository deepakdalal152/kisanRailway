const mongoose=require("mongoose")

const messageSchema=new mongoose.Schema({
    otp:{
        type:Number,required:true
    },
    mobile:{type:String,required:true},
    timeStamp:{type:String,required:true},
     UserID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"contactlist"
     }
})

const messageModal=mongoose.model("message",messageSchema)

module.exports=messageModal