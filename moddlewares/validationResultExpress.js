
// IMPORTS
// import validation result
import { validationResult } from "express-validator";

// check validations errors
export const validationResultExpress = ((req, res, next) =>{
  // get errors
  const errors = validationResult(req);
  // check if errors is not empty (it means there is at least one error)
  // returns errors in json
  if(!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  // if there is no errors, go to next method
  next()
})