import axios from "axios"
// baseURL: "http://localhost:3300/"
const api = axios.create({
   baseURL: "https://show-database-back.herokuapp.com/"
})

export default api