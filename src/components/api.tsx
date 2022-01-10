import axios from "axios"

const api = axios.create({
    baseURL: "https://show-database-back.herokuapp.com/"
})

export default api