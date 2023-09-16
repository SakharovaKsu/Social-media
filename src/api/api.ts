import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0',
    withCredentials: true,
    headers: {
        'API-KEY': '38441d44-efce-4f1f-95aa-be1f9fc10993'}
})

// ? - после вопроса идет get-параметр, 'ключ'='значение' (то, что запрашиваем у сервера), &-разделительный символ

export const usersApi = {
    async getUsers(currentPage: number, pageSize: number = 1) {
        return axiosInstance.get(`/users?page=${currentPage}&count=${pageSize}`)
            .then(respons => respons.data)
        // ретурнем то что приходит с нового промиса then, так как нам весь список не нужен с сервака, берем что нам необходимо
    },
    getAuth() {
        return axiosInstance.get(`/auth/me`)
    },
    followUser(id: number) {
        return axiosInstance.post(`/follow/${id}`, null)
    },
    unfollowUser(id: number) {
        return axiosInstance.delete(`/follow/${id}`)
    }
}
