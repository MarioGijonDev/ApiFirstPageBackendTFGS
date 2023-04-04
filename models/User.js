
// IMPORTS
// import mongoose
import mongoose from 'mongoose';

// get schema and model of mongoose
const { Schema, model } = mongoose;

// create use schema (fields of user)
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
    lowercase: true,
    index: { unqiue: true }
  },
  password: {
    type: String,
    required: true
  }
});

// create user model
export const User = model('user', userSchema);