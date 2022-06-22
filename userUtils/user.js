let mongoose =require('mongoose')
let bcrypt = require("bcrypt")
let userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"name required"],
        min:6,
        max:255,

    },
      email:{
        type:String,
        required:[true,"email required"],
        max:255

      },
    createdDate:{
         type:Date,
         default:()=>Date.now(),
    },
   password:{
        type:String,
        required:[true,"passwrord required"],
        min:6,
        max:255
   },
   Role:{
    type:String
   }
})
userSchema.pre("save",async function(next){
  //encrypting the user"s password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password,salt);

  //verifying if the user is suppose to be an admin or not
  if(this.email=="ennykhalid@gmail.com"){
    this.Role = "admin"
  }else{
    this.Role = "basic"
  }
  next();
});



 
module.exports= mongoose.model('User',userSchema)
