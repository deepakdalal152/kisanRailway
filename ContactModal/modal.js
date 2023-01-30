const mongoose=require("mongoose")

const ContactSchema=new mongoose.Schema({
      mobile:{type:String,unique:true,required:true},
      FirstName:{type:String,required:true},
      LastName:{type:String,required:true}

})

const ContactModal=mongoose.model("contactlist",ContactSchema)

module.exports=ContactModal