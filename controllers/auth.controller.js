
// IMPORTS
// import validation result
import { validationResult } from "express-validator";

// logic for login auth
export const login = (req, res) => {
  // if all its okey, make login action
  res.json({ action: "Login", request: req.body});
}

// logic for register auth
export const register = (req, res) => {
  // if all its okey, make login action
  res.json({ action: "Register", request: req.body});
};
