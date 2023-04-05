
// IMPORTS
// Import jwt
import jwt from 'jsonwebtoken'

// Function that generate jwt
// It gets id of user like a parameter
export const generateToken = (uid)=>{

  // 15min
  const expiresIn = 60*15;

  try{

    // Create token, with uid, expires in 15 min
    const token = jwt.sign({uid}, process.env.JWT_SECRET, { expiresIn })

    // Return the token and the expired time
    return { token, expiresIn }

  }catch(e){

    // Show error
    console.log(e)

  }

}