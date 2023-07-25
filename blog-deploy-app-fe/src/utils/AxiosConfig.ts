import axios from "axios";

//for handle multiple request

let isRefreshing: boolean = false
let failedQueue: any = []

const processQueue = (error: any, token = null) => {
    failedQueue.forEach((prom: any) => {
        if(error) {
            prom.reject(error)
        } else {
            prom.resolve(token)
        }
    })
    failedQueue = []
}

const AxiosGlobal = axios.create({
    baseURL: 'http://localhost:5000/api/v1',
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true,
    timeout: 6000
})

AxiosGlobal.interceptors.request.use(async (config) => {

    //we dont need attach access token when we 
    if(config.url === '/auth/refresh-token' && config.method === 'post') {
        return config
    }
    const token = localStorage.getItem('accessToken') as string;

    if(token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
}, (error) => {

    Promise.reject(error)
})

AxiosGlobal.interceptors.response.use((response) => response, async(error) => {
    const originalRequest = error?.config
    if(error?.response?.status === 401 && error?.response?.data?.error !== 'No token' && !originalRequest._retry) {
        if (isRefreshing) {
            return new Promise(function(resolve, reject) {
                failedQueue.push({resolve, reject})
            }).then(token => {
                originalRequest.headers.Authorization = `Bearer ${token}`
                return AxiosGlobal(originalRequest)
            }).catch(err => {
                return Promise.reject(err)
            })
        }
        originalRequest._retry = true;
        isRefreshing = true
        return new Promise(function (resolve, reject) {
            AxiosGlobal.post('/auth/refresh-token').then(({data}) => {
                localStorage.setItem('accessToken', data.accessToken)
                AxiosGlobal.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`
                originalRequest.headers['Authorization'] = 'Bearer ' + data.accessToken;
                processQueue(null, data.token);
                resolve(AxiosGlobal(originalRequest));
            }).catch(err => {
                processQueue(err, null)
                reject(err)
            }).finally(() => {
                isRefreshing = false
            })
        })
    }
    if (error.code === 'ECONNABORTED' && error.message.includes('timeout')) {
        console.log('Request timed out');
        return Promise.reject(error);
    }
    
    return Promise.reject(error);
})

export default AxiosGlobal