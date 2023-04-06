
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

// Function for generate token
export const generateRefreshToken = (uid, res)=>{

  // 1 day
  const expiresIn = 60^ 60 * 24 * 30

  try{

    // Create token with uid as payload
    const refreshToken = jwt.sign({uid}, process.env.JWT_REFRESH, {expiresIn});

    // Send cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: !(process.env.MODO === 'developer'),
      expires: new Date(Date.now() + expiresIn * 1000)
    });

  }catch(e){

    // Show error in console
    console.log(e)

  }

}