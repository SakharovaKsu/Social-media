export type ResponseType<T = {}> = {
    resultCode: number
    messages: string[]
    data: T
}

export type FormType = {
    email?: string
    password?: string
    rememberMe?: boolean
    captcha?: string | null
}
