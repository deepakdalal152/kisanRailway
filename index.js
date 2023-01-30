const express = require('express')
const cors=require("cors")
const mongoose=require("mongoose")
const connect= require("./Connect/Connect")
const ContactRouter=require("./ContactModal/Router")
const msgRouter=require("./MessageModal/router")
const PORT=process.env.PORT || 8000
mongoose.set('strictQuery', true)

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

app.use("/contact",ContactRouter)
app.use("/message",msgRouter)
app.get('/', (req, res) => res.send('hello World'))

app.listen(PORT, async() => {
     await connect()    
    console.log('server started on port 8000')
})