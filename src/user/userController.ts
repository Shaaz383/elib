import { Request,Response,NextFunction } from "express";
import createHttpError from "http-errors";
import userModel from "./userModel";
import bcrypt from "bcrypt"
import { sign } from "jsonwebtoken";
import { config } from "../config/config";
import { User } from "./userTypes";

const createUser =async (req :Request,res: Response,next : NextFunction) =>{

  const {name , email , password } = req.body;
  //validation (you can use express validator library also)
  if(!name ||!email ||!password){

    const error = createHttpError(400, "All fields are required")
    return next(error)
  }

  //Database Call
  try {
    //check if already exist
    const user = await userModel.findOne({email});
    
    if(user){
      const error = createHttpError(400, "User already exists")
      return next(error)
    }
    
  } catch (error) {
    return next(createHttpError(500, "Error while getting user"))
  }



  //Password Hash
  const hashedPassword = await bcrypt.hash(password,10);

  let newUser : User

  //Create new user 
  try {
    newUser=await userModel.create({
      name,
      email,
      password:  hashedPassword
    })
    
  } catch (error) {
    return next(createHttpError(500, "Error while creating user"))
  }



  //Token Generation JWT
  try {
    const token = sign({sub: newUser._id} , config.jswtSecret as string ,
    {
      expiresIn:"7d",
      algorithm : "HS256"
    })
  
    //response
  
    res.status(201).json({accessToken : token})
    
  } catch (error) {
    return next(createHttpError(500, "Error while signing jwt token "))
    
  }
}

const loginUser = async (req :Request,res: Response,next : NextFunction) =>{
    res.json({message : "OK"})
}


export {createUser , loginUser}