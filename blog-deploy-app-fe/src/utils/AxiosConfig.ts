import axios from "axios";

const AxiosGlobal = axios.create({
    baseURL: 'http://localhost:5000/api/v1',
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true
})

AxiosGlobal.interceptors.request.use(async (config) => {
    //we dont need attach access token when we 
    if(config.url === '/auth/refresh-token') {
        return config
    }
    const token = JSON.parse(localStorage.getItem('accessToken') as string);
    if(token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, (error) => Promise.reject(error))

AxiosGlobal.interceptors.response.use((response) => response, async(error) => {
    const originalRequest = error?.config
    if(error?.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
            const data = await AxiosGlobal.post('/auth/refresh-token')
            const token = data.data.accessToken
            AxiosGlobal.defaults.headers.common.Authorization = `Bearer ${token}`
            localStorage.setItem('accessToken', JSON.stringify(token))
            return AxiosGlobal(originalRequest)
        } catch (error) {
            console.log(error)
        } 
    }
    return Promise.reject(error);
})

export default AxiosGlobal