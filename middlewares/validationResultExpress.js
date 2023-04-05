
// IMPORTS
// Import validation result
import { validationResult } from "express-validator";

// Check validations errors
export const validationResultExpress = ((req, res, next) =>{

  // Get errors
  const errors = validationResult(req);

  // Check if errors is not empty (it means there is at least one error)
  if(!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });  
  
  // If there is no errors, go to next method
  next();
  
})