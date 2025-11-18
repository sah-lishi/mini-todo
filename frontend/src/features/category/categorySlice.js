import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categories: []
}

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        setCategory: (state, action) => {
            state.categories = action.payload
        },
        addCategory: (state, action) => {
            state.categories.push(action.payload)
        },
        updateCategory: (state, action) => {
            const index = state.categories.findIndex(categ => categ._id === action.payload._id)
            if(index !== -1) state.categories[index] = action.payload
        },
        deleteCategory: (state, action) => {
            state.categories = state.categories.filter(categ => categ._id !== action.payload)
        }
    }
})

export const {setCategory, addCategory, updateCategory, deleteCategory} = categorySlice.actions
export default categorySlice.reducer

