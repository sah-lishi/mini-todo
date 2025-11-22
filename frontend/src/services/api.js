import axios from 'axios'
const REACT_APP_API_URL="http://localhost:8000/api/v1"
const api = axios.create({
    baseURL: REACT_APP_API_URL,
    timeout: 20000,
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true
})

//request
api.interceptors.request.use(
    (config) => { 
        return config
    },
    // If something goes wrong before sending the request, reject the promise.
    (error) => Promise.reject(error)
)

// response
api.interceptors.response.use(
    // successHandler, when statusCode 200
    (res) => res,
    // errorHandler, when statusCode 400...500/network error
    (error) => {
        const err = error.response? {status: error.response.status, data: error.response.data} : {message: error.message}
        return Promise.reject(err)
    }
)

export default api