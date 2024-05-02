const express=require('express')
const morgan=require('morgan')
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path')


const AppError =require('./utils/appError')
const globleErrorHandler=require('./controller/errorController')

const dotenv=require('dotenv')
dotenv.config({path:'./config.env'})
const _dirname = path.resolve();


const userRouter=require('./routes/userRoutes')
const venueRouter=require('./routes/venueRoutes')
const reviewRouter=require('./routes/reviewRoutes')
const requestRouter=require('./routes/requestRoutes')

const app=express();
const cors = require('cors');
app.use(cors());


app.use(cors({
    origin: 'http://localhost:3001',  // Replace with your frontend's URL
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

app.use(express.static(path.join(_dirname, '/frontend/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(_dirname, 'frontend', 'build', 'index.html'));
  })

app.all('*',function(req,res,next){
    next(new AppError(`Can't find the ${req.originalUrl} on this server`))
})

app.use(globleErrorHandler.handleErrors)


module.exports=app 