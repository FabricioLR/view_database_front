import axios from "axios"

//"http://localhost:4000/"

const api = axios.create({
   baseURL: "http://localhost:4000/"
})

export default api