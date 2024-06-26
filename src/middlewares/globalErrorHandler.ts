import epress, { NextFunction, Request, Response } from 'express';
import createHttpError, { HttpError } from 'http-errors';
import { config } from '../config/config';





const globalErrorHandler = (err: HttpError ,req : Request , res : Response, next : NextFunction)=>{
  const statusCode = err.statusCode || 500;

  return res.status(statusCode).json({
    message: err.message,
    statusCode: statusCode,
    data: err.data,
    errorStack :config.env === "development" ? err.stack : "",
  })
}


export default globalErrorHandler