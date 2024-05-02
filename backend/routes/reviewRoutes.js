const express = require("express");
const reviewController = require('../controller/reviewController');
const authController = require('../controller/authController');

const router = express.Router();

router.use(authController.protect);


router.route('/:venueId').get(reviewController.getAllReviews)
router.route('/:venueId').post(authController.restrictTo('regular'),reviewController.setVenueUserIds,reviewController.createReview);


module.exports = router;
