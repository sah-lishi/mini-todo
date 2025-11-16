import {Router} from 'express'
import googleAuth from '../controllers/googleAuth/gauth.controller.js'

const router = Router()

router.route("/google-signup").post(googleAuth)    

export default router