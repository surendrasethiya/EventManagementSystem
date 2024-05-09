const mongoose=require('mongoose')
const catchAsync = require('../utils/catchAsync')
const cloudinary=require('../utils/cloudinary')
const VenueImages=require('../model/venueImagesModel')


exports.postImage = catchAsync(async (req, res, next) => {
    const image=req.body.image;
    const result = await cloudinary.uploader.upload(image, {
        folder: "venuePhotos"
    });
    await VenueImages.create({
        image:{
            public_id:result.public_id,
            url:result.secure_url
        },
        venue:req.params.venueId
    })
    res.status(200).json({
        status:"success",
    })
})


exports.getAllVenueImages=catchAsync(async(req,res,next)=>{
    const allImages=await VenueImages.find({venue:req.params.venueId})
    res.status(200).json({
        status:"success",
        totalResults:allImages.length,
        allImages
    })
})
