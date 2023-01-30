
const express = require('express')
const ContactModal=require("./modal")

const list=express.Router()

list.get("/",async(req,res)=>{
     const {name}=req.query
     console.log(name)
     try {
         if(name){ 
            let ans=await ContactModal.aggregate([{$match : {$or :[{FirstName :{$regex : name ,"$options" :"i"}},{LastName:{$regex : name ,"$options" : "i"}} ]}}])
            // let ans=await ContactModal.find({$or : [{FirstName:{$regex : name}},{LastName:{$regex : name}}]})
            res.send({data:ans})
         }
         else{
            let data=await ContactModal.find()
            res.send({data:data})
         }
         
     } catch (error) {
        res.status(400).send(error.message)
     }
})

list.post("/",async(req,res)=>{
        
        const {mobile,FirstName,LastName}=req.body
    try {
          if(!mobile || !FirstName || !LastName){
             return  res.status(501).send("plese provide valid information")
          }
          let list=new ContactModal({mobile,FirstName,LastName})
              await list.save()
           res.send({message:"Contact Added Successfully",data:list})   
    } catch (error) {
        res.status(501).send(error.message)
    }
     
})


module.exports=list