const ErrorHandler = require("../utils/errorHandler")
const catchAsyncErrors = require("../middleware/catchAsyncError")
const User = require('../models/userModel');
const sendToken = require("../utils/jwtToken");

// Register a user 
exports.registerUser = catchAsyncErrors( async(req,res,next)=>{
    const {name,email,password}=req.body;
    const user = await User.create({
        name,email,password,
        avatar:{
            public_id:"this is a sample id",
            url:"profilePicUrl"
        }
    });

   sendToken(user,201,res);
});

// Login User 
exports.loginUser = catchAsyncErrors( async (req,res,next)=>{
    const {email, password}= req.body;

    // checking if user has given password and email both 

    if(!email || !password){
        return next(new ErrorHandler("Please Enter Email & Password",400));
    }

    const user = await User.findOne({email}).select("+password"); 

    if(!user){
        return next(new ErrorHandler("Invalid email or password",401))
    }

    const isPasswordMatched = user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid email or password",401))

    }

    sendToken(user,200,res);

});

// Logout User 
exports.logout = catchAsyncErrors(async (req,res,next)=>{
    res.cookie("token",null,{
        expires: new Date(Date.now()),
        httpOnly: true,
    })

    res.status(200).json({
        success:true,
        message:"Logged Out"
    })
})