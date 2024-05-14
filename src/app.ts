import epress, { NextFunction, Request, Response } from 'express';
import globalErrorHandler from './middlewares/globalErrorHandler';
import userRouter from './user/userRouter';

const app = epress();

//Routes

app.get('/', (req,res,next)=>{


  res.json({

    message: 'Welcome to Ebook'
  })
});

//global error handler
app.use(globalErrorHandler);

//routes
app.use("/api/users",userRouter)

export default app;