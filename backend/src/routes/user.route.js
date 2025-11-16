import {Router} from 'express'
import { registerUser, loginUser, logoutUser, updateAccountDetails, updateProfileImage, updatePassword, getCurrentUser, refreshAccessToken } from '../controllers/user.controller.js'
import { upload } from '../middlewares/multer.middleware.js'
import { verifyJWT } from '../middlewares/auth.middleware.js'

const router = Router()

router.route("/register").post(
    upload.fields([
        {
            name: "profileImage",
            maxCount: 1
        }
    ]),
    registerUser)

router.route("/login").post(loginUser)    
router.route("/logout").post(verifyJWT,logoutUser)    
router.route("/update-account-details").patch(verifyJWT, updateAccountDetails)    
router.route("/update-profile-image").patch(verifyJWT, upload.single("profileImage"), updateProfileImage)
router.route("/update-password").post(verifyJWT, updatePassword)
router.route("/current-user").get(verifyJWT, getCurrentUser)
router.route("/access-token").post(refreshAccessToken)

export default router