let express = require('express')
let router = express.Router()
let User  = require('../userUtils/user')
require("dotenv").config()
let bcrypt = require('bcrypt')
let  {signupSchemaValidator,loginSchemaValidator,parcelCreationSchemaValidator}  = require('../userUtils/Validator')
let  {createtoken,maxAge} = require("../userUtils/gentoken");
let  {requireAuth} = require('../middleware/authMiddleware')
let Parcel = require("../parcelUtils/parcelSchema")
let {mailer} = require("../userUtils/mailer")

//route for user to get their own parcels
router.get("/parcels",requireAuth,async(req,res)=>{
  try{
    let parcels = await Parcel.find({userId:user.id})
  res.status(200).send(parcels)
  }
  catch(err){
    //handling errors
    console.log(err.message)
    res.status(400).send(err.message)
  }
})

//route for changing presentLocation of the parcel
router.put("/parcels/:id/presentLocation",requireAuth,async(req,res)=>{
  try{
       //verifying user's Role 
       if(user.Role==='admin'){
          //Getting presentLocation from req and also getting the parcel
          let {address,city,state,country} =  req.body
          let parcel = await Parcel.findById({_id:req.params.id})
          //making sure the parcel's id is valid
          if(parcel===null) {return res.status(400).send("This parcel id is invalid")}

          // making sure no other form gets updated and convert to lowercase
          parcel.presentLocation.address = address.toLowerCase();
          parcel.presentLocation.city = city.toLowerCase();
          parcel.presentLocation.state = state.toLowerCase();
          parcel.presentLocation.country = country.toLowerCase();
          //finding out if location are the same so i can change the status
          if(parcel.presentLocation.address ==parcel.destination.address && parcel.presentLocation.city==parcel.presentLocation.city){
            parcel.status= "delivered"
            //Getting the parcel's owner and making sure they are notified of the new status via email
            let {email,name} = await User.findById({_id:parcel.userId})
            mailer(email,name,parcel.packageName)
          }
          await parcel.save()
          res.status(200).send({msg:`parcel with id:${parcel._id} has been present location has been updated`})
        }
        else{
          res.status(400).send("Only the admin can access this route")
        }
        else{
          res.status(400).send("Only the admin can access this route")
        }
  }
  catch(err){
    //handling errors
    console.log(err.message)
    res.status(400).send(err.message)
  }

})

//route for cancelling parcel delivery order
router.put("/parcels/:id/cancel",requireAuth, async(req,res)=>{
  try{
      //verifying parcel delivery id
    let parcel= await Parcel.findById({_id:req.params.id})
    if(parcel==null) throw Error ('invalid parcel id')

    //verifying if the package already been delivered
     if(parcel.status=="delivered") return res.status(400).send("destinaton can't be altered, package already delivered")

     //verifying if it's the user's order
     if(user.id==parcel.userId) { 
        let deletedParcel = await Parcel.findByIdAndDelete({_id:req.params.id})
        res.status(200).send({msg:"Your order has been cancelled succesfully",id:deletedParcel.id},)
        }
        else{return res.status(401).send("You are not authorized to change this parcel")}
  }
   catch(err){
    //handling errors
    console.log(err.message)
    res.status(400).send(err.message)
   }
})

//route for changing destinations of order
router.put("/parcels/:id/destination",requireAuth, async(req,res)=>{
  try{
      //verifying parcel delivery id
      let parcel= await Parcel.findById({_id:req.params.id})
      if(parcel==null) throw Error ('invalid parcel id')
      //verifying if the package already been delivered
      if(parcel.status=="delivered") return res.status(400).send("destinaton can't be altered, package already delivered")

      //verifying if it's the user's order
      if(user.id==parcel.userId) { 
       //Getting changes to be made
       let {city,state,country,address} = req.body
         // making sure no other form gets updated and convert to lowercase
       parcel.destination.address = address.toLowerCase();
       parcel.destination.city = city.toLowerCase();
       parcel.destination.state = state.toLowerCase();
       parcel.destination.country = country.toLowerCase();
       await parcel.save()
       res.status(201).json({msg:"your parcel's destination has been updated",id:parcel.id})
      }
       else{
        res.status(401).send("You are not authorized to change destination of this parcel")
       }
      
  }
  catch(err){
     //handling errors
      console.log(err.message)
      res.status(400).send(err.message)
  }
})


//route for creating and adding parcel to the database
router.post("/parcel",requireAuth,async(req,res)=>{
  try{
    await parcelCreationSchemaValidator.validateAsync(req.body)
    let {packageName,destination,description,presentLocation} = req.body
    let parcel = await Parcel.create({
        packageName,
        destination,
        description,
        presentLocation,
        userId:user.id,
        status:"undelivered"
      })
    
      res.status(201).json({msg:"Your package has been created",id:parcel._id})
  }
  //taking care of the error
  catch(err){
    console.log(err.message)
    res.status(400).send(err.message)
  }
})

//route for only the admin to see
router.put("/parcels/:id/status",requireAuth,async (req,res)=>{
  try{
       //verifying user's Role 
        if(user.Role==='admin'){
          //Getting new status from req and also getting the parcel
          let {newStatus}= req.body
          let parcel = await Parcel.findById({_id:req.params.id})

          //making sure the parcel's id is valid
          if(parcel===null) {return res.status(400).send("This parcel id is invalid")}

          //changing the status to the new one
          parcel.status = newStatus.toLowerCase()
          await parcel.save()
          res.status(200).send({msg:`parcel with id:${parcel._id} has been updated`})

          //Getting the parcel's owner and making sure they are notified of the new status via email
          let {email,name} = await User.findById({_id:parcel.userId})
          mailer(email,name,parcel.packageName)
        }
        else{
           res.status(401).send("You are not authorized only an admin can access this route")
        }}
  catch(err){
    //error handling
    console.log(err.message)
    res.status(400).send(err.message)
  }
})


//route for signing up
router.post("/auth/signup",async(req,res)=>{
      try{
        //making sure the req.body meets requirements
        await signupSchemaValidator.validateAsync(req.body)

        //checking if email exists
        let {email} = req.body
        const emailexist = await User.findOne({email})
        if(emailexist) return res.status(409).send("email already exist")

      //creating user 
      let user = await User.create(req.body)

        //creating token for authenticaton
        const token = await createtoken(user._id,user.Role)
        res.cookie("jwt",token,{httpOnly:true,maxAge:maxAge*1000})
        res.status(201).json({id:user._id})
      }
      //taking care of the errors
      catch(err){
          res.send(err.message)
          console.log(err.message)
      }
})
router.post("/auth/login",async(req,res)=>{
    try{
        //check if req.body meets requirements
        await loginSchemaValidator.validateAsync(req.body)
        const {email ,password} = req.body

        //email verification
        let user = await User.findOne({email})
        if(!user) { return res.status(400).send("invalid email")}
        
        //password verification
        let validPassword = await bcrypt.compare(password,user.password)
        if(!validPassword) { return res.status(400).send("invalid password")}
        
        //creating token for authenticaton
        const token = await createtoken(user._id,user.Role)
        res.cookie("jwt",token,{httpOnly:true,maxAge:maxAge*1000})
        res.status(201).json({id:user._id})
     }  

    //taking care of the errors
      catch(err){
      res.send(err.message)
      console.log(err.message)
      }})

//route for logging out
router.get("/auth/logout",(req,res)=>{
  res.cookie('jwt',"",{maxAge:1})
  res.status(200).send("you have been logged out")
})
module.exports = router
