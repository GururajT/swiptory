const express=require('express')
const Router= express.Router()
const userController=require('../controller/auth')
Router.post('/register',userController.Register)
Router.post('/login',userController.Login)
module.exports=Router