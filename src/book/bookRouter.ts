import express from 'express';
import multer from 'multer'
import {createBook} from './bookController';
import path from 'node:path'
import authenticate from '../middlewares/authenticate';



const bookRouter = express.Router()

const upload = multer({
  dest : path.resolve(__dirname,'../../public/data/uploads'),
  limits : {
    fileSize : 3e7
  },

})

//routes

bookRouter.post('/',authenticate,upload.fields([
  {name : 'coverImage', maxCount : 1},
  {name : 'file', maxCount : 1}
]) , createBook);




export default bookRouter;