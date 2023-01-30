const dotenv=require('dotenv')
dotenv.config()


const client = require('twilio')(process.env.AccountSID,process.env.AuthToken); 
 

const sendSMS=async({message,number})=>{
 console.log("sms",message,number)
try {
    
 let data=await client.messages.create({ 
    body:message,  
    messagingServiceSid:process.env.ServiceID,
    to:number 
  }) 

return data
    
} catch (error) {
    return error
}
    
}

module.exports=sendSMS