const Venue=require('../model/venueModel')
const catchAsync = require('../utils/catchAsync')


exports.getAllVenues = catchAsync(async (req, res,next) => {
    const filter = {};

    if (req.query.city) {
        filter.city = req.query.city;
    }

    if (req.query.state) {
        filter.state = req.query.state;
    }

    if (req.query.name) {
        filter.name = new RegExp(req.query.name, 'i');
    }

    if (req.query.propertyType) {
        filter.propertyType = req.query.propertyType;
    }

    if (req.query.event) {
        filter.event = req.query.event;
    }
    const isFilterEmpty = Object.keys(filter).length === 0;

    const venues = isFilterEmpty ? await Venue.find() : await Venue.find(filter);

  
    res.status(200).json({
        message: "success",
        results:venues.length,
        venues
    })
})


exports.createVenue = catchAsync(async (req, res, next) => {
    const venueData = req.body;
    const data=await Venue.create(venueData.formData);
    res.status(201).json({
        status: "success",
        id:data.id
    });
});


exports.getOneVenue = (catchAsync(async (req, res,next) => {
    const getOneVenue = await Venue.findById(req.params.id)
    res.status(200).json({
        status: "success",
        data: getOneVenue
    })
}))

exports.deleteOneVenue = (catchAsync(async (req, res, next) => {
    await Venue.findByIdAndDelete(req.params.id)
    res.status(204).json({
        status: 'success',
    })
}))

exports.updateOneVenue = (catchAsync(async (req, res, next) => {

    const updatedVenue = await Venue.findById(req.params.id)
    const filteredBody=req.body

    await Venue.findByIdAndUpdate(req.params.id, filteredBody, {
        new: true,
    })

    res.status(200).json({
        status: "success",
        message: "venue updated successfully"
    })
}))