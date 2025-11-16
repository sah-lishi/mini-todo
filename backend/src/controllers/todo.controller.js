import asyncHandler from '../utils/asyncHandler.js'
import { apiError } from '../utils/apiError.js'
import {apiResponse} from '../utils/apiResponse.js'
import {Category} from '../models/categories.model.js'
import { Todos } from '../models/todos.model.js'
import mongoose from 'mongoose'

const addTodo = asyncHandler(async(req, res) => {
    const {title, description, status, priority, dueDate, category, completedAt} = req.body
    if([title, description].some((field) => field.trim() === ""))
        throw new apiError(400, "All fields are required")

    // validate if category is created and belong to the user
    if(category){
        const validCategory = await Category.findOne({_id: category, owner: req.user._id})
        if(!validCategory) throw new apiError(404, "Category not found or doesn't belong to the user")
    }
    const newTodo = await Todos.create({
            title, 
            description, 
            status,
            priority,
            dueDate,
            completedAt,
            category: category || null,
            owner: req.user._id
        }) 

    const todoCreated = await newTodo.populate("category", "name")

    return res.status(201).json(
        new apiResponse(201, todoCreated, "Todo created successfully")
    )

})
const updateTodo = asyncHandler(async(req, res) => {
    const {todoId} = req.params
    const {title, description, status, priority, dueDate, completedAt, category} = req.body
    if([title, description].some((field) => field.trim() === ""))
        throw new apiError(400, "Title and description are required")
    if(category){
        const validCategory = await Category.findOne({_id: category, owner: req.user._id})
        if(!validCategory) throw new apiError(404, "Category not found or doesn't belong to the user")
    }
    let updatedFields = {}
    if(title)
        updatedFields.title = title
    if(description)
        updatedFields.description = description
    if(status)
        updatedFields.status = status
    if(priority)
        updatedFields.priority = priority
    if(dueDate)
        updatedFields.dueDate = dueDate
    if(completedAt)
        updatedFields.completedAt = completedAt
    if(category !== undefined){
        updatedFields.category = category || null
    }
    
    const updatedTodo = await Todos.findByIdAndUpdate(
        todoId, updatedFields, {new: true}
    )

    if(!updatedTodo)
        throw new apiError(404, "Todo not updated")
    return res
    .status(200)
    .json(new apiResponse(200, updatedTodo, "Todo updated successfully"))
})
const deleteTodo = asyncHandler(async(req, res) => {
    const {todoId} = req.params
    const userId = req.user._id

    const todo = await Todos.findById(todoId)
    if(todo.owner.toString() !== userId.toString())
        throw new apiError(400, "Unauthorixed to delete the todo")

    await Todos.findByIdAndDelete(todoId)
    return res
    .status(200)
    .json(new apiResponse(200, {}, "Todo deleted successfully"))
})
const getTodoById = asyncHandler(async(req, res) => {
    const {todoId} = req.params
    const userId = req.user._id

    const todo = await Todos.findById(todoId)
    if(todo.owner.toString() !== userId.toString())
        throw new apiError(400, "Unauthorixed to view the todo")

    return res
    .status(200)
    .json(new apiResponse(200, todo, "Todo fetched successfully"))
})
const getTodosByCategory = asyncHandler(async(req, res) => {
    const {categoryId} = req.params
    const userId = req.user._id

    if(!mongoose.isValidObjectId(categoryId))
        throw new apiError(400, "Invalid Category ID")

    const categoryExists = await Category.findOne({_id: categoryId, owner: userId})
    if(!categoryExists)
        throw new apiError(404, "Category not found or not owned by the user")

    const todos = await Todos.aggregate([
        {
            $match: {
                category: new mongoose.Types.ObjectId(categoryId),
                owner: new mongoose.Types.ObjectId(userId)
            },
        },
        {
            $lookup: {
                from: "categories",
                localField: "category",
                foreignField: "_id",
                as: "categoryDetails"
            }
        },
        {
            $unwind: "$categoryDetails"
        },
        {
            $project: {title: 1, description: 1, status: 1, priority: 1, dueDate: 1, completedAt: 1, "categoryDetails.name": 1}
        }
    ])
    return res.status(200).json(new apiResponse(200, todos, "Todos fetched by category successfully"))
})
const getAllTodo = asyncHandler(async(req, res) => {
    const userId = req.user._id
    const allTodos = await Todos.aggregate([
        {
            $match: {owner: new mongoose.Types.ObjectId(userId)}
        },
        {
            $sort: {createdAt: -1}
        }
    ])
    return res.status(200).json(
    new apiResponse(200, allTodos, "All Todos fetched successfully"))
})
const getTodosWithoutCategory = asyncHandler(async(req, res) => {
    const userId = req.user._id
    const todos = await Todos.aggregate([
        {
            $match: {
                owner: new mongoose.Types.ObjectId(userId), 
                category: null
            },
        },
        {
            $sort: {createdAt: -1}
        }
    ])
    return res
    .status(200)
    .json(new apiResponse(200, todos, "Todos without category fetched successfully"))
})

export {addTodo, updateTodo, deleteTodo, getAllTodo, getTodosByCategory, getTodoById, getTodosWithoutCategory}
