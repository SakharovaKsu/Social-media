import { axiosInstance } from './axiosInstance'
import { AxiosResponse } from 'axios'
import { FormType, ResponseType } from './api.type'

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
