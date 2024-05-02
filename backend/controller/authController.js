const User =require('../model/userModel')
const catchAsync = require('../utils/catchAsync')
const jwt = require('jsonwebtoken')
const AppError = require('../utils/appError')
const { promisify } = require('util')
const cloudinary=require('../utils/cloudinary')


const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {})
}

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id)

    const cookieOptions = {
        httpOnly: true
    }

    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true

    res.cookie('jwt', token, cookieOptions)
    user.password = undefined

    res.status(statusCode).json({
        status: "success",
        token,
        user

    })
}


exports.signUp = catchAsync(async (req, res, next) => {

    // const image=req.body.image;
    // const result = await cloudinary.uploader.upload(image, {
    //     folder: "profilePhotos"
    // });
    const newUser = await User.create({
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
        mobile: req.body.mobile,
        // image:{
        //     public_id:result.public_id,
        //     url:result.secure_url
        // }
    })
    createSendToken(newUser, 201, res)
})


exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body
    const user = await User.findOne({ email }).select('+password')
    if (!user || (!await user.correctPassword(password, user.password))) {
        return next(new AppError('Incorrect email and password', 401))
    }
    createSendToken(user, 200, res)
})

exports.logout = (req, res) => {
    res.cookie('jwt', 'logged-out', {
        expires: new Date(Date.now() + 10 * 1000), // Set cookie expiration time to 10 seconds from now
        httpOnly: true
    });
    res.status(200).json({
        status: "success"
    });
};


exports.protect = catchAsync(async (req, res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
    } else if (req.cookies.jwt) {
        token = req.cookies.jwt
    }


    if (!token) {
        return next(new AppError('You are not logged in please log in', 401))
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)

    const currentUser = await User.findById(decoded.id).select('+phoneNumber')

    if (!currentUser) {
        return next(new AppError('user does no longer exists', 401))
    }
    req.user = currentUser
    next()
})


exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.userType)) {
            return next(new AppError('You do not have permission to perform this action', 403))
        }
        next()
    }
}