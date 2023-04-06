
// IMPORTS
// Import jwt
import jwt from 'jsonwebtoken'

// Function for check the token
export const requireToken = (req, res, next)=>{

  try{

    // Get token 
    const bearerToken = req.headers?.authorization;

    // Throw error if there is not token
    if(!bearerToken) throw new Error('Token must be in bearer format')

    const token = bearerToken.split(' ')[1];

    // Get payload of the token, in this case, id of user
    const { uid } = jwt.verify(token, process.env.JWT_SECRET)

    // Put the id in the request params
    req.uid = uid

    // Go to the othe method
    next()

  }catch(e){

    // Return a json with all the errors
    return res.status(401).json( { error: e.message })
    
  }

}