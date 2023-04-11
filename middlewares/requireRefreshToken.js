
// IMPORTS
// Import jwt
import jwt from 'jsonwebtoken'

export const requireRefreshToken = (req, res, next)=> {

  try{

    const refreshTokenCookie = req.cookies.refreshToken;

    if(!refreshTokenCookie) throw new Error('Token does not exists');

    const { uid } = jwt.verify(refreshTokenCookie, process.env.JWT_REFRESH);

    req.uid = uid

    next()

  }catch(e){

    return res.status(401).json({ error: e.message })

  }

}