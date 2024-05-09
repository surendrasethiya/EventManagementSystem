const Review = require('../model/reviewModel');
const catchAsync = require('../utils/catchAsync');

exports.getAllReviews= catchAsync(async (req, res, next) => {

    const reviews = await Review.find({venue:req.params.venueId});

    res.status(200).json({
        status: 'success',
        results: reviews.length,
        reviews
    });
});


exports.setVenueUserIds= (req,res,next) =>{
    if(!req.body.venue) req.body.venue=req.params.venueId 
    if(!req.body.user) req.body.user=req.user.id
    next()
}


exports.createReview = catchAsync(async (req, res, next) => {
    const data = req.body;
    await Review.create(data);
    res.status(201).json({
        status: "success",
        data: null
    });
});