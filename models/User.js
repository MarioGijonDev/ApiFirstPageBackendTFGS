
// IMPORTS
// Import mongoose
import mongoose from 'mongoose';
// Import bcrypt
import bcryptjs from 'bcryptjs'

// Get schema and model of mongoose
const { Schema, model } = mongoose;

// Create use schema (fields of user)
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    index: { unqiue: true }
  },
  surname: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    index: { unqiue: true }
  },
  email:{
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
    index: { unique: true },
    useCreateIndex: true,
    autoIndex: true
  },
  password: {
    type: String,
    required: true
  }
});

// function for Hash the password
// Mandatory a function instead of an arrow function, cause we need the variable this
userSchema.pre("save", async function(next){

  // If password is not modified, go to the next method
  if(!this.isModified('password')) return next()

  try{

    // Get salt for enctyption
    const salt = await bcryptjs.genSalt(10)

    // Hash password
    this.password = await bcryptjs.hash(this.password, salt)

    // Go to the next method
    next()

  }catch(e){

    throw new Error ('Failed on hashing password')

  }

})

// Create method for user schema that compare if the 2 password is the same
userSchema.methods.comparePassword = async function (candidatePassword){

  // Return true if is equal, flase if not
  return await bcryptjs.compare(candidatePassword, this.password)

}

// Create user model
export const User = model('User', userSchema);