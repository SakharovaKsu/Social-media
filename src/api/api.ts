import axios, {AxiosResponse} from 'axios';
import {setUserProfileAC} from '../redux/postPageReducer';

export type ResponseType<T = {}> = {
    resultCode: number
    messages: string[],
    data: string
}

export const axiosInstance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0',
    withCredentials: true,
    headers: {
        'API-KEY': '38441d44-efce-4f1f-95aa-be1f9fc10993'}
})

// ? - после вопроса идет get-параметр, 'ключ'='значение' (то, что запрашиваем у сервера), &-разделительный символ

export const userAPI = {
    getUsers(currentPage: number, pageSize: number = 1) {
        return axiosInstance.get(`/users?page=${currentPage}&count=${pageSize}`)
            .then(respons => respons.data)
        // ретурнем то что приходит с нового промиса then, так как нам весь список не нужен с сервака, берем что нам необходимо
    },
    followUser(id: number) {
        return axiosInstance.post(`/follow/${id}`, null)
    },
    unfollowUser(id: number) {
        return axiosInstance.delete(`/follow/${id}`)
    }
}

export const authAPI = {
    getAuthMe() {
        return axiosInstance.get(`/auth/me`)
    }
}

export const profileAPI = {
    getProfile(userId: string){
        return axiosInstance.get(`/profile/` + userId )
            .then(response => setUserProfileAC(response.data))
    },
    getUserStatus(userId: string) {
        return axiosInstance.get(`/profile/status/` + userId )
    },
    updateStatus(status: string) {
        return axiosInstance.put(`/profile/status/`, {status})
        // return axiosInstance.put<ResponseType, AxiosResponse<ResponseType>, { status: string }>(`/profile/status/`, {status})
    }
}