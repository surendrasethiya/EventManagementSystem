const Request=require('../model/requestModel')
const catchAsync = require('../utils/catchAsync');

exports.getAllRequests= catchAsync(async (req, res, next) => {

    const requests = await Request.find();

    res.status(200).json({
        status: 'success',
        results: requests.length,
        requests
    });
});


exports.createRequest = catchAsync(async (req, res, next) => {
    const data = req.body;
    await Request.create(data.data);
    res.status(201).json({
        status: "success",
        data: null
    });
});

exports.deleteOneRequest = (catchAsync(async (req, res, next) => {
    await Request.findByIdAndDelete(req.params.id)
    res.status(204).json({
        status: 'success',
    })
}))