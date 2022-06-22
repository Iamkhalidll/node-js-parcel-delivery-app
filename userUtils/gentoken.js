require('dotenv').config()
let jwt = require("jsonwebtoken");
let maxAge = 60*20*3;
//function to generate a token
let createtoken = async(id ,Role)=>{
    return  jwt.sign({id,Role},process.env.accessTokenSecret,{expiresIn:maxAge})
}
module.exports = {createtoken,maxAge}