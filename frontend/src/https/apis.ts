import axios from "axios";
const api = axios.create({
    baseURL: "http://localhost:5000/api",
    // withCredentials: true,
});

axios.defaults.withCredentials = true;

export const getAllTodo = (query: string) => api.get(`/todo?${query}`)
export const createTodo = (data: ITodo) => api.post('/todo', data)
export const editTodo = (id: string, action: string, data?: ITodo) => api.put(`/todo?id=${id}&action=${action}`, data)
export const deleteTodo = (id: string) => api.delete(`/todo/${id}`)
export const bulkAction = (data: IBulk) => api.put(`/todo/bulk`,data)
export const whoami = () => api.get("/auth/whoami")


api.interceptors.request.use(
    (config) => {
        // Retrieve the JWT token from local storage or wherever you have it stored
        const token = window.localStorage.getItem("token")

        // Set the Authorization header with the JWT token
        if (token) {
            config.headers['token'] = `${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;