const cookieParser = require("cookie-parser")
let express = require("express")
require("dotenv").config()
let app = express();
let mongoose = require("mongoose")
//This is a function for connecting into the database
connect()
async function connect(){
    try{
    await mongoose.connect(process.env.userConnect)

    }
    catch(err){
        //handling err
        console.log(err.message)
    }
}

//This is used to ensure we can get info from the cookies
let cookieparser=("cookie-parser")
//These are middlewares
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
let routes = require("./routes/route")
app.use('/api/v1' ,routes)
app.listen(process.env.PORT || 3105,()=>{
    console.log("server is running")
})


