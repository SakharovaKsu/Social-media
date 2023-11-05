import axios, { AxiosResponse } from 'axios'
import { ContactsType, PhotosType, ProfileType, setUserProfileAC } from '../redux/postPageReducer'

export type ResponseType<T = {}> = {
    resultCode: number
    messages: string[]
    data: T
}

export type FormType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

export const axiosInstance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0',
    withCredentials: true,
    headers: {
        'API-KEY': '38441d44-efce-4f1f-95aa-be1f9fc10993',
    },
})

// ? - после вопроса идет get-параметр, 'ключ'='значение' (то, что запрашиваем у сервера), &-разделительный символ

export const userAPI = {
    getUsers(currentPage: number, pageSize: number = 1) {
        return axiosInstance.get(`/users?page=${currentPage}&count=${pageSize}`).then((respons) => respons.data)
        // ретурнем то что приходит с нового промиса then, так как нам весь список не нужен с сервака, берем что нам необходимо
    },
    followUser(id: number) {
        return axiosInstance.post(`/follow/${id}`, null)
    },
    unfollowUser(id: number) {
        return axiosInstance.delete(`/follow/${id}`)
    },
}

export const authAPI = {
    getAuthMe() {
        return axiosInstance.get(`/auth/me`)
    },
    login(data: FormType) {
        return axiosInstance.post<null, AxiosResponse<ResponseType<{ userId: number }>>, FormType>('auth/login', data)
    },
    logOut() {
        return axiosInstance.delete<ResponseType>('auth/login')
    },
}

export const profileAPI = {
    getProfile(userId: string) {
        return axiosInstance.get(`/profile/` + userId).then((response) => setUserProfileAC(response.data))
    },
    getUserStatus(userId: string) {
        return axiosInstance.get(`/profile/status/` + userId)
    },
    updateStatus(status: string) {
        return axiosInstance.put<ResponseType>(`/profile/status/`, { status })
        // return axiosInstance.put<ResponseType, AxiosResponse<ResponseType>, { status: string }>(`/profile/status/`, {status})
    },
    savePhoto(filePhoto: File) {
        const formData = new FormData()
        // добавляем в конец
        formData.append('image', filePhoto)
        return axiosInstance.put<ResponseType<{ photos: PhotosType }>>('/profile/photo', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        })
    },
    saveProfile(profile: Omit<ProfileType, 'photos'>) {
        return axiosInstance.put<ResponseType<{ profile: ProfileType }>>('/profile', profile)
    },
}
