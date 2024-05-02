const mongoose = require('mongoose')


const venueImages=mongoose.Schema({
    image:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }   
    },
    venue: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Venue',
        required: [true, 'review must belong to a venue'],
    },
    createdAt: {
        type: Date,
        select:false
    },
    
})

venueImages.index({venue:1})

venueImages.pre('save', function (next) {
    this.createdAt = new Date();
    next();
});

const VenueImages= mongoose.model('VenueImages', venueImages)
module.exports = VenueImages