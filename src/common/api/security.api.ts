import { axiosInstance } from './axiosInstance'

export const securityAPI = {
    getCuptchaUrl() {
        return axiosInstance.get(`/security/get-captcha-url`)
    },
}
