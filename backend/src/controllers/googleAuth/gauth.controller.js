import {OAuth2Client} from 'google-auth-library'
import { User } from '../../models/user.model.js'
import { apiResponse } from '../../utils/apiResponse.js'
import { apiError } from '../../utils/apiError.js'
import { generateAccessAndRefreshToken } from '../user.controller.js'

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
const googleAuth = async(req, res) => {
    try {
        const {credential} = req.body
        if(!credential) throw new apiError(400, "Google token missing")

        // verify google token
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID
        })

        const payload = ticket.getPayload()
        const {name, email, picture} = payload

        if (!email) throw new apiError(400, "Google account missing email");

        // check if user exists
        let user = await User.findOne({email})

        if (user) {
            if (user.authProvider !== "google") {
                throw new apiError(
                400,
                "This email is registered with a password. Please login manually."
                );
            }
        } else {
                // if user doesn't exist, create new user
                user = await User.create({
                    username: name,
                    email,
                    profileImage: picture,
                    password: "",
                    authProvider: "google"
                })
        }

            // destructure tokens
            const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id)

            const loggedInUser = await User.findById(user._id).select("-password -refreshToken")
        

            const options = {
                httpOnly: true,
                secure: true,
                sameSite: "None"
            }

            return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(
                new apiResponse(
                    200, {
                        user: loggedInUser, accessToken, refreshToken
                    }, user.isNew?
                    "User registered successfully" : "User logged in successfully"
                )
            )
    } catch (error) {
        console.error("Google login error: ", error)
        return res.status(500).json({message: "Google login failed"})
    }
}

export default googleAuth