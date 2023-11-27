import { axiosInstance } from './axiosInstance'
import { AxiosPromise } from 'axios'

export const userAPI = {
    getUsers(currentPage: number, pageSize: number = 1) {
        return axiosInstance.get(`/users?page=${currentPage}&count=${pageSize}`).then((respons) => respons.data)
        // ретурнем то что приходит с нового промиса then, так как нам весь список не нужен с сервака, берем что нам необходимо
    },
    followUser(id: number) {
        return axiosInstance.post(`/follow/${id}`, null)
    },
    unfollowUser(id: number) {
        return axiosInstance.delete(`/follow/${id}`) as AxiosPromise<ResponseType>
    },
}
