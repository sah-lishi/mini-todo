import api from "./api";

const todosService = {
    addNewTodo: async (data) => { 
        const res = await api.post("/todos/", data)
        return res.data
    },
    fetchAllTodo: async () => { 
        const res = await api.get("/todos/")
        return res.data
    },
    fetchTodosWithoutCategory: async () => { 
        const res = await api.get("/todos//no-category")
        return res.data
    },
    fetchTodosWithCategory: async (categoryId) => { 
        const res = await api.get(`/todos/category/${categoryId}`)
        return res.data
    },
    fetchSingleTodo: async (todoId) => { 
        const res = await api.get(`/todos/${todoId}`)
        return res.data
    },
    deleteTodo: async (todoId) => { 
        const res = await api.delete(`/todos/${todoId}`)
        return res.data
    },
    updateTodo: async (id, todoData) => { 
        const res = await api.patch(`/todos/${id}`, todoData)
        return res.data
    },
}

export default todosService