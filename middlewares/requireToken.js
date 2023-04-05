
// IMPORTS
// Import jwt
import jwt from 'jsonwebtoken'

// Function for check the token
export const requireToken = (req, res, next)=>{

  try{

    // Get bearer token of request header
    const bearerToken = req.headers?.authorization;

    // Get the part of the toeken (EG. bearer sdklfjjdsfasfs.asdas)
    const token = bearerToken.split(' ')[1];

    // Throw error if there is not token
    if(!token) throw new Error('Token must be in bearer formar')

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