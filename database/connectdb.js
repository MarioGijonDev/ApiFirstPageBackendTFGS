
// IMPORTS
import mongoose from 'mongoose';

try{
  // Realizamos una conexión a mongoose
  await mongoose.connect(process.env.URI_MONGODB)
  console.log('Connected to MongoDB')

}catch(e){
  // En caso de error, lo mostramos en la terminal
  console.log(`Connection error to MongoDB: ${e.message}`)
}  


