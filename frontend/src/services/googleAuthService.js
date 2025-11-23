import api from "./api"

const googleAuthService = {
    googleSignup: async(data) => {
        const res = await api.post("/gauth/google-signup", data)
        return res.data
    }
}

export default googleAuthService