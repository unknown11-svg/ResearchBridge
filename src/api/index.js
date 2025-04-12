import axios from "axios"

const domain = "https://localhost:5000/api"  

const API = {}


const AUTH = {
    authenticate: async (token) => {
        return axios.post(domain + "https://localhost:5000/auth/authenticate", {token})
    }
}


const USER = {
    getAll: async (config) => {
        return axios.get(domain + '/user', config)
    },
    getById: async (id, config) => {
        return axios.get(domain + `/user/${id}`, config)
    },
    modify: async (id,payload, config) => {
        return axios.post(domain + `/user/${id}`, payload, config)
    },
    delete: async (id, config) => {
        return axios.delete(domain + `/user/${id}`, config)
    },
}


API.AUTH = AUTH
API.USER = USER

export default API