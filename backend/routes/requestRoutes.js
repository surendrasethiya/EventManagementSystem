const express = require("express");
const authController = require('../controller/authController');
const requestController=require('../controller/requestController')
const router = express.Router();


router.use(authController.protect);


router
      .route('/')
      .get(authController.restrictTo('admin'),requestController.getAllRequests)
      .post(authController.restrictTo('regular'),requestController.createRequest)

router.route('/:id').delete(authController.restrictTo('admin'),requestController.deleteOneRequest)

module.exports = router;
