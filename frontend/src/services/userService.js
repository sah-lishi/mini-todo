import api from './api'

const userService = {
  registerUser: async (data) => { 
    const res = await api.post("/users/register", data)
    return res.data
  },
  login: async (data) => { 
    const res = await api.post("/users/login", data)
    return res.data
  },
  userDetail: async () => { 
    const res = await api.get("/users/current-user")
    return res.data
  },
  refreshAccesstoken: async () => { 
    const res = await api.post("/users/access-token")
    return res.data
  },
  logout: async () => { 
    const res = await api.post("/users/logout")
    return res.data
  },
  updateUserDetail: async (data) => { 
    const res = await api.patch("/users/update-account-details", data)
    return res.data
  },
  updateUserProfile: async (data) => { 
    const res = await api.patch("/users/update-profile-image", data)
    return res.data
  },
  updatePassword: async (data) => { 
    const res = await api.patch("/users/update-password", data)
    return res.data
  },
}

export default userService