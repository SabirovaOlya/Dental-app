import axios from "axios";

const https = axios.create({
    baseURL: 'https://dental-app.financial-project.uz/api/',
    withCredentials: false,
    headers: {
        "Accept": "application/json;charset=utf-8"
    }
})

export default https;