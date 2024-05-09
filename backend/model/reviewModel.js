const mongoose = require('mongoose')
const Venue =require('../model/venueModel')

const reviewSchema = new mongoose.Schema({
    review: {
        type: String,
        required: [true, 'Reviews can not be empty!']
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    venue: {
        type: mongoose.Schema.ObjectId,
        ref: 'Venue',
        required: [true, 'review must belong to a venue'],
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'review must belong to a user'],
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})


reviewSchema.index({venue:1,user:1}, {unique : true})


reviewSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'user'
    })
    next()
})

reviewSchema.statics.calcAverageRatings = async function (venueId) {
    const stats = await this.aggregate([
        {
            $match: { venue: venueId }
        },
        {
            $group: {
                _id: '$venue',
                nRating: { $sum: 1 },
                avgRating: { $avg: '$rating' }
            }
        },
    ])

    if(stats.length>0){
        await Venue.findByIdAndUpdate(venueId, {
            ratingsAverage: stats[0].avgRating
        })
    }else{
        await Venue.findByIdAndUpdate(tourId, {
            ratingsAverage: 4.5
        })
    }
}

reviewSchema.post('save', function () {
    this.constructor.calcAverageRatings(this.venue)
})

reviewSchema.pre(/^findOneAnd/,async function(next){
    this.r=await this.findOne()
    next()
})

reviewSchema.post(/^findOneAnd/,async function(next){
    await this.r.constructor.calcAverageRatings(this.r.venue)
})


const Review = mongoose.model('Review', reviewSchema)
module.exports = Review