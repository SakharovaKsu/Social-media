import { axiosInstance } from './axiosInstance'
import { PhotosType, ProfileType, setUserProfile } from '../redux/postPageReducer'
import { ResponseType } from './api.type'

export const profileAPI = {
    getProfile(userId: string) {
        return axiosInstance.get(`/profile/` + userId).then((response) => setUserProfile(response.data))
    },
    getUserStatus(userId: string) {
        return axiosInstance.get(`/profile/status/` + userId)
    },
    updateStatus(status: string) {
        return axiosInstance.put<ResponseType>(`/profile/status/`, { status })
    },
    savePhoto(filePhoto: File) {
        const formData = new FormData()
        formData.append('image', filePhoto)
        return axiosInstance.put<ResponseType<{ photos: PhotosType }>>('/profile/photo', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        })
    },
    saveProfile(profile: Omit<ProfileType, 'photos'>) {
        return axiosInstance.put<ResponseType<{ profile: ProfileType }>>('/profile', profile)
    },
}
