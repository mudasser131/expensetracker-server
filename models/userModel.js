import mongoose from "mongoose";

const  userSchema = new mongoose.Schema( { 

fullname : {

type : String,
required : true

},

email : {

    type : String,
    required : true,
    unique: true // ✅ Ensures email is unique
  },
  password: {
    type: String,
    required: true
  }


  }  ) ;


  export const User  = mongoose.model(" User", userSchema)