import axios from "axios";

class ApiService {
    #URL = 'https://dental-app.financial-project.uz/api'

    async getEmployees(){
        return axios.get(`${this.#URL}/workers`)
    }

    async getEmployee(id){
        return axios.get(`${this.#URL}/workers/${id}`)
    }
}

export default new ApiService()