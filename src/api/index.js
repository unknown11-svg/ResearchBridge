import axios from "axios"

const domain = "http://localhost:5000/api"  

const API = {}


const AUTH = {
    authenticate: async (token) => {
        return axios.post(domain + "https://localhost:5000/auth/authenticate", {token})
    }
}


const USER = {
    signup: async (formData) => {
        return axios.post(domain + '/users', formData);
      },
      

    login: async (email, password) => {
        return axios.post(domain + '/users/login', { email, password });
    },
    getAll: async (config) => {
        return axios.get(domain + '/users', config);
    },
    getById: async (id, config) => {
        return axios.get(domain + `/users/${id}`, config);
    },
    modify: async (id, payload, config) => {
        return axios.post(domain + `/users/${id}`, payload, config);
    },
    delete: async (id, config) => {
        return axios.delete(domain + `/users/${id}`, config);
    },
};


API.AUTH = AUTH
API.USER = USER

export default API