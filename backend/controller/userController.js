const User = require('../model/userModel')
const catchAsync = require('../utils/catchAsync')
const bcrypt = require('bcryptjs');

exports.getUser = catchAsync(async (req, res,next) => {
    const user = await User.findOne({_id:req.user.id})
    res.status(200).json({
        message: "success",
        user
    })
})


const filterObj = (obj, ...allwedfields) => {
    const newObj = {}
    Object.keys(obj).forEach(el => {
        if (allwedfields.includes(el)) {
            newObj[el] = obj[el]
        }
    })
    return newObj
}


exports.updateMe = catchAsync(async (req, res, next) => {
    //step1 create error if user posts password data
    if (req.body.password || req.body.passwordConfirm) {
        return next(new AppError('this is not for update the password', 400))
    }

    //step2 filter out unwanted fields name that are  allowed to be updated by the user
    const filteredBody = filterObj(req.body, 'userName','email','mobile')

    //step3 update user document
    const updateUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
        new: true,
        runValidators: true
    })

    res.status(200).json({
        status: "success",
        data: {
            user: updateUser
        }
    })
})

exports.updatePassword =catchAsync(async(req,res,next)=>{
    const {newPassword,password} = req.body
    const email=req.user.email

    const user = await User.findOne({ email }).select('+password')
    if (!user || (!await user.correctPassword(password, user.password))) {
        return next(new AppError('Incorrect email and password', 401))
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);
    
    await User.findByIdAndUpdate(req.user.id,{ password:hashedPassword })
    res.status(200).json({
        status: "success",
    })

})




