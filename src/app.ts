import epress, { NextFunction, Request, Response } from 'express';
import createHttpError, { HttpError } from 'http-errors';
import { config } from './config/config';
import globalErrorHandler from './middlewares/globalErrorHandler';

const app = epress();

//Routes

app.get('/', (req,res,next)=>{


  res.json({

    message: 'Welcome to Ebook'
  })
});

//global error handler
app.use(globalErrorHandler        )

export default app;