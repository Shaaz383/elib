import { Request,Response,NextFunction } from "express";
import createHttpError from "http-errors";
import userModel from "./userModel";

const createUser =async (req :Request,res: Response,next : NextFunction) =>{

  const {name , email , password } = req.body;
  //validation (you can use express validator library also)
  if(!name ||!email ||!password){

    const error = createHttpError(400, "All fields are required")
    return next(error)
  }

  //Database Call

  const user = await userModel.findOne({email});
  
  if(user){
    const error = createHttpError(400, "User already exists")
    return next(error)
  }


  //process
  //response

  res.json({ message: "User Created"})
}

export {createUser}