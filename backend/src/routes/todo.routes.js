import {Router} from 'express'
import { addTodo, updateTodo, deleteTodo, getAllTodo, getTodoById, getTodosByCategory, getTodosWithoutCategory } from '../controllers/todo.controller.js'
import { verifyJWT } from '../middlewares/auth.middleware.js'

const router = Router()
router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

router.route("/")
    .post(addTodo)
    .get(getAllTodo)    

router.route("/no-category").get(getTodosWithoutCategory)
router.route("/category/:categoryId").get(getTodosByCategory)
router.route("/:todoId")
    .get(getTodoById)
    .delete(deleteTodo)
    .patch(updateTodo);

export default router