import asyncHandler from '../utils/asyncHandler.js'
import { apiError } from '../utils/apiError.js'
import {apiResponse} from '../utils/apiResponse.js'
import {Todos} from '../models/todos.model.js'
import {Category} from '../models/categories.model.js'
import mongoose from 'mongoose'
const createCategory = asyncHandler(async(req, res) => {
    const {name} = req.body
    if (!name) {
        throw new apiError(400, "Category name is required")
    }
    
    const newCategory = await Category.create({
        name,
        owner: req.user._id
    })

    return res.status(201).json(
        new apiResponse(201, newCategory, "Category created successfully")
    )

})
const updateCategory = asyncHandler(async(req, res) => {
    const {name} = req.body
    const {categoryId} = req.params
    const userId = req.user._id
    const category = await Category.findById(categoryId)

    if (category.owner.toString() !== userId.toString()) {
        throw new apiError(400, "Unauthorixed to update the category")
    }

    const updatedCategory = await Category.findByIdAndUpdate(
        categoryId, {
            $set: {
                name 
            }
        }, {new: true}
    )
    if(!updatedCategory)
        throw new apiError(404, "Category not updated")
    return res.status(201).json(
        new apiResponse(201, updatedCategory, "Category updated successfully")
    )
})
const deleteCategotry = asyncHandler(async(req, res) => {
    const {categoryId} = req.params
    const userId = req.user._id
    const category = await Category.findById(categoryId)

    if (category.owner.toString() !== userId.toString()) {
        throw new apiError(400, "Unauthorixed to delete the category")
    }
    await Category.findByIdAndDelete(categoryId)
    await Todos.deleteMany({ category: categoryId, owner: userId })

    return res.status(201).json(
        new apiResponse(201, "Category deleted successfully")
    )
})
const getCategoryById = asyncHandler(async(req, res) => {
    const {categoryId} = req.params
    const userId = req.user._id

    const category = await Category.findById(categoryId)
    if(category.owner.toString() !== userId.toString())
        throw new apiError(400, "Unauthorixed to view the category")

    return res
    .status(200)
    .json(new apiResponse(200, category, "Category fetched successfully"))
})
const getAllCategory = asyncHandler(async(req, res) => {
    const userId = req.user._id
    const allCategory = await Category.aggregate([
        {
            $match: {owner: new mongoose.Types.ObjectId(userId)}
        },
        {
            $sort: {createdAt: -1}
        }
    ])
    return res.status(200).json(
    new apiResponse(200, allCategory, "All category fetched successfully"))
})

export {createCategory, updateCategory, deleteCategotry, getAllCategory, getCategoryById}