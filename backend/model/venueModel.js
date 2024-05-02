const mongoose=require('mongoose')

const venueSchema=mongoose.Schema({
    name:{
        type:String,
        required: [true, 'Please provide venue name']
    },
    state:{
        type:String,
        required:[true, 'Please provide state name']
    },
    city:{
        type:String,
        required:[true, 'Please provide city']
    },
    address:{
        type:String,
        required:[true, 'Please provide address']
    },
    maxCapacity:{
        type:Number,
        required:[true, 'Please provide maxCapacity']
    },
    ratingsAverage: {
        type: Number,
        default: 4.5,
        min:[1,'rating must be above 1'],
        max:[5,'rating must be less 5.0'],
        set: val=>Math.round(val*10)/10
    },
    propertyType:{
        type:String,
        enum:['hotel','garden','pool','hall','confress hall','other']
    },
    description:{
        type:String,
    },
      numberOfHalls:{
        type:Number
      },
      numberOfRooms:{
        type:Number
      },
      numberOfGardens:{
        type:Number
      },
      refundPolicy:{
        type:String,
        default:"no refund"
      }
},{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

venueSchema.virtual('venueImages',{
    ref:'VenueImages',
    foreignField:'venue',
    localField:'_id'
})

venueSchema.virtual('reviews',{
    ref:'Review',
    foreignField:'venue',
    localField:'_id'
})

venueSchema.pre(/^find/, function (next) {
    this.populate({
        path:'venueImages',
    })
    this.populate({
        path:'reviews'
    })
    next()
})

const Venue=mongoose.model('Venue',venueSchema)
module.exports=Venue