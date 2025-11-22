import asyncHandler from '../utils/asyncHandler.js'
import { apiError } from '../utils/apiError.js'
import {User} from '../models/user.model.js'
import {uploadOnCloudinary} from '../utils/cloudinary_upload.js'
import {apiResponse} from '../utils/apiResponse.js'
import hasValidMxRecord from '../utils/mxLookup.js'
import jwt from "jsonwebtoken"

// user registration
const registerUser = asyncHandler(async (req, res) => {
    const {username, email, password, authProvider = "local"} = req.body
    if([username, password].some((field) => field?.trim() === "")){
        throw new apiError(400, "All fields are required")
    }

    // If the user is signing up manually (local), ensure password is present
    if (authProvider === "local" && !password?.trim()) {
        throw new apiError(400, "Password is required")
    }
    // email format & domain validate (for local)
    if(authProvider === "local") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new apiError(400, "Invalid email format");
        }
        
        const hasMx = await hasValidMxRecord(email)
        if (!hasMx) {
            throw new apiError(400, "Invalid email domain")
        }
    }

    // check if user already exists
    const existedUser = await User.findOne({email})
    if (existedUser) {
        throw new apiError(409, "User already exists")
    }

    let profileImageLocalPath
    if (req.files && Array.isArray(req.files.profileImage) && req.files.profileImage.length > 0) {
        profileImageLocalPath = req.files.profileImage[0].path
    }

    const profileImage = await uploadOnCloudinary(profileImageLocalPath)

    // create new user
    const user = await User.create({
        username,
        profileImage: profileImage?.url || "",
        email,
        password,
        authProvider
    })

    const userCreated = await User.findById(user._id).select("-password -refreshToken")

    if (!userCreated) {
        throw new apiError(500, "Something went wrong while registering the user")
    }
    // destructure tokens
    const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id)
    const options = {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new apiResponse(
            200, {
                user: userCreated
            },
            "User registered successfully"
        )
    )
})

// login
const loginUser = asyncHandler(async(req, res) => {
    const {email, password} = req.body
    if (!(email)) {
        throw new apiError(400, "email is required")
    }
    const user = await User.findOne({email}).select("+password")
    //if user doesn't exist
    if (!user) {
        throw new apiError(404, "User does not exist")
    }
    // console.log("User found:", user);
    // console.log("user.authProvider:", user.authProvider);

    // Prevent manual login for Google accounts
    if(user.authProvider === "google") {
        throw new apiError(400, " Please continue with Google Sign-In.")
    }
    // if user exists, check password
    const isPasswordValid = await user.isPasswordCorrect(password)
    if (!isPasswordValid) {
        throw new apiError(401, "Password is incorrect!")
    }

    // destructure tokens
    const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new apiResponse(
            200, {
                user: loggedInUser
            },
            "User logged in successfully"
        )
    )
})

const generateAccessAndRefreshToken = async(userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()
        // save refersh token in db
        user.refreshToken = refreshToken
        await user.save({validateBeforeSave: false})

        return {accessToken, refreshToken}
    } catch (error) {
        throw new apiError(500, "Unable to generate refresh and access token")
    }
}

// logout
const logoutUser = asyncHandler(async (req,res) => {
    await User.findOneAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    )
    const options = {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
    }

    return res.status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new apiResponse(200, {}, "User logged out"))
})

// new access token generation using refersh token
const refreshAccessToken = asyncHandler(async(req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken

    if(!incomingRefreshToken){
        throw new apiError(401, "unauthorized request")
    }

    try {
        const decodedToken = jwt
        .verify(
            incomingRefreshToken, 
            process.env.REFRESH_TOKEN_SECRET
        )
    
        const user = await User.findById(decodedToken?._id).select("+refreshToken")    
    
        if (!user) {
            throw new apiError(401, "Invalid refresh token")
        }
    
        if (incomingRefreshToken !== user?.refreshToken) {
            throw new apiError(401, "Refresh token expired/used")
        }
    
        const options = {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        }
    
        const accessToken = user.generateAccessToken()
    
        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .json(
            new apiResponse(
                200,
                "Access token refreshed successfully"
            )
        )
    } catch (error) {
        throw new apiError(401, error?.message || "Invalid refresh token")
    }
}) 

// change password
const updatePassword = asyncHandler(async(req, res) => {
    const {oldPassword, newPassword, confirmPassword} = req.body

    if (!(newPassword === confirmPassword)) {
        throw new apiError(400, "Incorrect password")
    }

    const user = await User.findById(req.user?._id)

    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)

    if (!isPasswordCorrect) {
        throw new apiError(400, "Invalid password")
    }

    user.password = newPassword
    await user.save({validateBeforeSave: false})

    return res
    .status(200)
    .json(new apiResponse(200, {}, "Password changed"))
})

// current user detail
const getCurrentUser = asyncHandler(async(req, res) => {
    return res
    .status(200)
    .json(new apiResponse(200, req.user, "Current user fetched successfully"))
})

// update username or email
const updateAccountDetails = asyncHandler(async(req, res) => {
    const {username, email} = req.body

    if(!(username || email)){
        throw new apiError(400, "All fields are required")
    }
    // console.log("Authenticated user:", req.user);

    const userdata = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                username,
                email 
            }
        },
        {
            new: true //to return user info after updating
        }
    ).select("-password")

    // if (!userdata) {
    //     throw new apiError("No user found")
    // }

    return res
    .status(200)
    .json(new apiResponse(200, "Account details updated successfully"))
})

// update profile image
const updateProfileImage = asyncHandler(async(req, res) => {
    const profileImageLocalPath = req.file?.path
    if (!profileImageLocalPath) {
        throw new apiError(400, "profileImage file is missing")
    }
     
    const profileImage = await uploadOnCloudinary(profileImageLocalPath)
    if (!profileImage.url) {
        throw new apiError(400, "Error while uploading profile image")
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                profileImage: profileImage.url
            }
        },
        {
            new: true
        }
    ).select("-password")

    return res
    .status(200)
    .json(new apiResponse(200, user, "Profile image updated successfully"))
})
export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    updatePassword,
    getCurrentUser,
    updateAccountDetails,
    updateProfileImage,
    generateAccessAndRefreshToken
}