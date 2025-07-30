import ApiError from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import User from "../models/user.model.js";
import { validationResult } from 'express-validator'

const register = AsyncHandler(async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password} = req.body

    if(!username || !email || !password){
        throw new ApiError(400, 'All Fields are required')
    }
    const existedUser = await User.findOne({ email });
    
    if(existedUser){
        throw new ApiError(400, 'User with email or username already esists')
    }

    const user = await User.create({
        username,
        email,
        password
    })

    const createdUser = await User.findById(user._id).select('-password')

    if(!createdUser){
        throw new ApiError(500, "Something Went Wrong While signin the user")
    }

    return res.status(200).json(
        new ApiResponse(200, createdUser, "User Sign Successfully")
    )
})

const login = AsyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    const { email, password } = req.body
    if(!email){
        throw new ApiError(400, "Enter email")
    }
    const user = await User.findOne({email}).select('+password')

    if(!user){
        throw new ApiError(401,"User does not exist")
    }

    const isValidPassword = await user.isPasswordCorrect(password)
    if(!isValidPassword){
        throw new ApiError(401, "Invalid Password")
    }
    
    const token = user.generateToken()
    
    console.log("Token At signin",token);
    
    const loggedInUser = await User.findById(user._id).select("-password") 

    res.cookie('token', token,
        { httpOnly: true, }
    )

    return res.status(200).json(
        new ApiResponse(200, "User Logedin Successfully",{user:loggedInUser, token})
    )
})

const logout = AsyncHandler( async(req, res) => {
    return res.clearCookie('token').status(200).json(
        new ApiResponse(200, "User hasbeet LogedOut Successfully")
    )
})

export {
    register,
    login,
    logout
}