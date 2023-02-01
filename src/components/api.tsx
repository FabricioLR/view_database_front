import axios from "axios"

//"http://localhost:4000/"
//"https://view-database-back.onrender.com"

const api = axios.create({
   baseURL: "https://view-database-back.onrender.com"
})

export default api