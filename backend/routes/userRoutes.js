const express=require('express')
const userController=require('../controller/userController')
const authController=require('../controller/authController')

const router=express.Router()

router.post('/signUp',authController.signUp)
router.post('/login',authController.login)
router.get('/logout',authController.protect,authController.logout)

router.use(authController.protect)
router.get('/',userController.getUser)
router.patch('/updateMe',userController.updateMe)
router.patch('/updatePassword',userController.updatePassword)



module.exports=router