const express=require('express')
const venueController=require('../controller/venueController')
const venueImageController=require('../controller/venueImageController')
const authController=require('../controller/authController')

const router=express.Router()


//need to add autication
router.get('/',venueController.getAllVenues)
router.post('/cv',authController.protect,authController.restrictTo('admin'),venueController.createVenue)


router
    .route('/:id')
    .get(venueController.getOneVenue)
    .delete(authController.protect,authController.restrictTo('admin'),venueController.deleteOneVenue)
    .patch(authController.protect,authController.restrictTo('admin'),venueController.updateOneVenue)

router
    .route('/:venueId/i')
    .post(authController.protect,venueImageController.postImage)
    .get(venueImageController.getAllVenueImages)
    
module.exports=router
