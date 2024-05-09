const User=require('../models/user')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
require('dotenv').config();
const Register=async(req,res,next)=>{
    try {
        const {Username,password}=req.body;

        if (!Username|| !password){
            return res.status(400).json({
                errorMessage:"bad request"
            })
        }
        // const existingUser=User.findOne({username:Username})
        // if(existingUser){
        //     return res.status(409).json({
        //         errorMessage:"User name already taken"
        //     })
        // }
        const hashedPassword= await bcrypt.hash(password,10)

        const userData= new User({
            Username,
            password:hashedPassword
        })
        await userData.save()
        res.json("user registered successfully")
    } catch (error) {
        next(error)
    }
}
const Login=async(req,res,next)=>{
    try {
        const {Username,password}=req.body;

        if (!Username||!password){
            return res.status(400).json({
                errorMessage:"bad request"
            })
        }
        const userDetail=await User.findOne({Username})
        if(!userDetail){
            return res.status(400).json({
                errorMessage:"invalid credentails"
            })
        }
        const passwordMatch=await bcrypt.compare(
            password,
            userDetail.password
        )
        if(!passwordMatch){
            return res.status(400).json({
                errorMessage:"invalid credentails"
            })
        }
        const token=jwt.sign( 
            { userId: userDetail._id },
            process.env.SECRET_KEY)

        res.json({
            message: "User logged in",
            name: userDetail.name,
            token: token,
        });
    } catch (error) {
        next(error)
    }
}
module.exports={Register,Login}