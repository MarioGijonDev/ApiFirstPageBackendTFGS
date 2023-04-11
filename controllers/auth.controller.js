
// IMPORTS
// Import user model
import { User } from '../models/User.js'
// Import generateToken
import { generateRefreshToken, generateToken } from '../utils/tokenManager.js';

// Register for register auth
export const register = async (req, res) => {

  // Get email and password from body
  const { name, email, password } = req.body;

  try{

    // Create user with model
    const user = new User({name, email, password});

    // Save user un database
    await user.save();

    // Send result
    return res.json({status: 'ok', action: 'register' }); 

  }catch(e){

    // If error is equal to 1100, it means the email already exists
    if(e.code === 11000)
      return res.status(400).json({ status: 'bad', error: 'Email already exists' })

    // Return server error
    return res.status(500).json({ status: 'bad', error: 'Something went wrong in server' })

  }
};

// Logic for login auth
export const login = async (req, res) => {

  // Get email and password of request
  const { email, password } = req.body;

  console.log(email, password)

  try{

    // Chek if user exists
    let user = await User.findOne({ email });

    console.log(email)
    console.log(!user ? 'No existe' : 'Existe')

    // If not existes, reply a json with the message
    if(!user)
      return res.status(403).json({ status: 'bad', error: 'User does not exists' });

    // Check if password matches with database
    const passwordResponse = await user.comparePassword(password);

    // If passwords dont matches, reply a json with message
    if(!passwordResponse)
      return res.status(403).json({ status: 'bad', error: 'Incorrect credentials' });

    // Generate token jwt
    const { token, expiresIn } = generateToken(user.id);

    // Generate refresh token jwt
    generateRefreshToken(user.id, res)

    // Return message with action
      return res.json({ status: 'ok', action: 'login' }); 

  }catch(e){

    // Return server error
    return res.status(500).json({ status: 'bad', error: 'Something went wrong in server' })

  }
}
 
// Return json with name, surname and email of the user
export const infoUser = async (req, res) =>{ 

  try{

    // Find user by id, using lean for get simplicity data
    const {name, email} = await User.findById(req.uid).lean();

    // Return the data in a json
    return res.json({status: 'ok', name, email })

  }catch(e){

    // Return error
    return res.status(401).json({ status: 'bad', error: e.message })

  }

}

export const refreshToken = (req, res) =>{

  try {

    // Generate refresh token
    const { token, expiresIn } = generateToken(req.uid);

    // Return token and expires data
    return res.json({ action: 'refreshToken', token, expiresIn })

  }catch(e){
    
    // Send error
    return res.status(401).send({ status: 'bad', error: e.message })

  }

}

export const logout = (req, res)=>{
  
  try{
    
    // Remove client's refresh roken
    res.clearCookie('refreshToken')

    // Send result
    res.json({ status: 'ok', action: 'logout' })

  }catch(e){

    // Show error in console
    res.status(400).json({ status: 'bad', error: 'Something went wrong at loggin out, check you are login and refresh page'})

  }
}

export const removeUser = async (req, res)=>{
  
  try{

    const result = await User.findByIdAndRemove(req.uid)

    const userDeleted = await User.findById(req.uid).lean();

    if(userDeleted)
      throw new Error('No user removed');

    console.log(result)

    console.log(req.uid)



    // Send result
    res.json({ status: 'ok', action: 'remove' })

  }catch(e){

    // Show error in console
    res.status(400).json({ status: 'bad', error: 'Something went wrong at loggin out, check you are login and refresh page'})

  }
}