const express=require('express')
const morgan=require('morgan')
const cookieParser = require('cookie-parser');
const cors = require('cors');


const AppError =require('./utils/appError')
const globleErrorHandler=require('./controller/errorController')

const dotenv=require('dotenv')
dotenv.config({path:'./config.env'})


const userRouter=require('./routes/userRoutes')
const venueRouter=require('./routes/venueRoutes')
const reviewRouter=require('./routes/reviewRoutes')
const requestRouter=require('./routes/requestRoutes')

const app=express()

app.use(cors({
    origin: 'http://localhost:3000',  // Replace with your frontend's URL
    credentials: true,
  }));
  
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())


if(process.env.NODE_ENV==='development'){
    app.use(morgan('dev'))
}

app.use('/user',userRouter)
app.use('/venue',venueRouter)
app.use('/review',reviewRouter)
app.use('/request',requestRouter)

app.all('*',function(req,res,next){
    next(new AppError(`Can't find the ${req.originalUrl} on this server`))
})

app.use(globleErrorHandler.handleErrors)


module.exports=app 