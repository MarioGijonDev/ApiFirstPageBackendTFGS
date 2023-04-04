
// IMPORTS
// import mongoose
import mongoose from 'mongoose';

try{
  // connect to mongodb
  await mongoose.connect(process.env.URI_MONGODB)
  console.log('Connected to MongoDB')

}catch(e){
  // if there is an error, show in console
  console.log(`Connection error to MongoDB: ${e.message}`)
}  
