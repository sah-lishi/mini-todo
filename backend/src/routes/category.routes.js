import {Router} from 'express'
import { createCategory, updateCategory, deleteCategotry, getAllCategory, getCategoryById } from '../controllers/category.controller.js'
import { verifyJWT } from '../middlewares/auth.middleware.js'

const router = Router()
router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

router.route("/")
.post(createCategory)
.get(getAllCategory)

router.route("/:categoryId")
    .get(getCategoryById)
    .delete(deleteCategotry)
    .patch(updateCategory);
    
export default router