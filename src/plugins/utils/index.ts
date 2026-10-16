import axios from "axios"

axios.defaults.baseURL = `${import.meta.env.VITE_CMS_URL}`

export const auth = axios.create()
