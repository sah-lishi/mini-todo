import api from "./api";

const categoryService = {
    addNewCategory: async (data) => { 
        const res = await api.post("/category/", data)
        return res.data
    },
    fetchAllCategory: async () => { 
        const res = await api.get("/category/")
        return res.data
    },
    fetchSingleCategory: async (categId) => { 
        const res = await api.get(`/todos/${categId}`)
        return res.data
    },
    deleteCategory: async (categId) => { 
        const res = await api.delete(`/category/${categId}`)
        return res.data
    },
    updateCategory: async (categData) => { 
        const res = await api.patch(`/todos/${categData._id}`, categData)
        return res.data
    },
}

export default categoryService