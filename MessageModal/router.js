const express=require("express")
const msgModal=require("./model")
const sendSMS=require("./SendSms")

const msg=express.Router()

msg.get("/",async(req,res)=>{
    
  const {number,page=1}=req.query 
   console.log(number,page)

    try {
        
      let total=await msgModal.find().count()
      let totalPages=Math.ceil(total/10)
      console.log(totalPages)
         
       

        if(number){
             let data=await msgModal.find({mobile:`+91${number}`}).populate("UserID").sort({timeStamp:-1})
             console.log(data)
          return  res.send({data:data,totalPages:1})
        }
        else{
            let data=await msgModal.find().populate("UserID").sort({timeStamp:-1}).skip((page-1)*10).limit(10)
         return   res.send({data:data,totalPages:totalPages})
        }
         
        

    } catch (error) {
        res.status(500).send(error.message)
    }
})


msg.post("/",async(req,res)=>{
     const {otp,mobile,UserID}=req.body
     console.log(otp,mobile,UserID)
        let datasms=await sendSMS({message:`Hi Your OTP is ${otp}`,number:mobile})
        console.log(datasms)
      try {
          
        let data=new msgModal({mobile,otp,timeStamp:datasms.dateCreated,UserID})
        await data.save()
          
        res.send({data:data})

      } catch (error) {
         res.status(500).send(error.message)
      }
})


module.exports=msg