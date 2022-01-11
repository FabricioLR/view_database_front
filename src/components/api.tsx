import axios from "axios"
// baseURL: "https://show-database-back.herokuapp.com/"
const api = axios.create({
   baseURL: "http://localhost:3300/"
})

export default api