const jwt = require('jsonwebtoken')
require('dotenv').config()
//middleware function to check authorizaion
const requireAuth = (req,res,next)=>{
    try{
         const token = req.cookies.jwt
        if(token){
            let decodedToken=  jwt.verify(token,process.env.accessTokenSecret);
            user= decodedToken
            next();
        }
        else{ res.status(401).send('unauthorised need to be logged in'); }
    }
    catch(err){
        console.log(err.message)
        res.status(400).send(err.message)
    }
       

}

module.exports ={requireAuth}