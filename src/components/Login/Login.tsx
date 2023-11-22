import React from 'react'
import s from './Login.module.css'
import { LoginForm } from './LoginForm/LoginForm'

const Login = React.memo(() => {
    return (
        <div className={s.login}>
            <div className={s.containerLogin}>
                <h2 className={s.title}>Let’s Sign You In</h2>
                <p className={s.subtitle}>Welcome back, we missed you!</p>
                <LoginForm />
            </div>
        </div>
    )
})

export default Login
