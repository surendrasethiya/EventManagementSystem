const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');

const AppError = require('./utils/appError');
const globleErrorHandler = require('./controller/errorController');

const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const _dirname = path.resolve();

const userRouter = require('./routes/userRoutes');
const venueRouter = require('./routes/venueRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const requestRouter = require('./routes/requestRoutes');

const app = express();




app.use(cors({
  origin: 'http://localhost:3000', // Set the origin to allow requests from any origin
  credentials: true,
}));

// app.use(cors({ origin: "*" }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:3001");
//   res.setHeader("Access-Control-Allow-Credentials", "true");
//   res.setHeader("Access-Control-Max-Age", "1800");
//   res.setHeader("Access-Control-Allow-Headers", "content-type");
//   res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS");
//   next();
// });

app.use('/user', userRouter);
app.use('/venue', venueRouter);
app.use('/review', reviewRouter);
app.use('/request', requestRouter);

app.use(express.static(path.join(_dirname, '/frontend/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(_dirname, 'frontend', 'build', 'index.html'));
});

app.all('*', function(req, res, next) {
  next(new AppError(`Can't find the ${req.originalUrl} on this server`));
});

app.use(globleErrorHandler.handleErrors);

module.exports = app;
