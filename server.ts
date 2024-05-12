import { config } from './src/config/config';
import app from './src/app';

const startServer = () =>{
  const port= config.port || 3000;

  app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
  })
}

//Routes

app.get('/', (req,res,next)=>{
  res.status(200).json({
    message: 'Welcome to Ebook'
  })
})

startServer();