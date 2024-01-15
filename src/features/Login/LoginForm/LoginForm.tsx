import React from 'react'
import { useHistory } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../common/redux/store'
import { captchaUrlSelector, isAuthSelector } from '../../../common/redux/selectors/authSelector'
import { errorSelector } from '../../../common/redux/selectors/appSelector'
import { useFormik } from 'formik'
import { loginTC } from '../../../common/redux/authReducer'
import s from '../Login.module.css'
import Button from '../../Elements/Button/Button'

type FormDataType = {
    email?: string
    password?: string
    rememberMe?: boolean
    captcha?: string | null
}

export const LoginForm = React.memo(() => {
    const history = useHistory()
    const isLoggedIn = useAppSelector(isAuthSelector)
    const error = useAppSelector(errorSelector)
    const captchaUrl = useAppSelector(captchaUrlSelector)
    const dispatch = useAppDispatch()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
            captcha: '',
        },
        validate: (values) => {
            const errors: FormDataType = {}
            const regx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
            if (!values.email) {
                errors.email = 'Required'
            } else if (!regx.test(values.email)) {
                errors.email = 'Invalid email address'
            }

            if (!values.password) {
                errors.email = 'Required'
            } else if (values.password.length < 4) {
                errors.password = 'Must be more than 3 symbols'
            }
            if (!values.captcha) {
                errors.captcha = 'Required'
            }
            return errors
        },
        onSubmit: (values) => {
            dispatch(loginTC(values))

            console.log(values)
            // очищаем форму после отправки
            formik.resetForm()
        },
    })

    const hasEmailError = formik.touched.email && formik.errors.email
    const hasPasswordError = formik.touched.password && formik.errors.password
    const inputClassName = `${s.input} ${hasEmailError || hasPasswordError ? s.errorInput : ''}`

    if (isLoggedIn) {
        history.push('/profile')
        return null
    }

    return (
        <div>
            <form className={s.form} onSubmit={formik.handleSubmit}>
                <div className={s.containerInput}>
                    <input className={inputClassName} {...formik.getFieldProps('email')} />
                    {formik.touched.email && formik.errors.email && (
                        <span className={s.spanError}>{formik.errors.email}</span>
                    )}
                </div>
                <div className={s.containerInput}>
                    <input className={inputClassName} type={'password'} {...formik.getFieldProps('password')} />
                    {formik.touched.password && formik.errors.password && (
                        <span className={s.spanError}>{formik.errors.password}</span>
                    )}
                    {error && <span className={s.spanError}>{error}</span>}
                </div>
                <label className={s.label}>
                    <input
                        type={'checkbox'}
                        checked={formik.values.rememberMe}
                        {...formik.getFieldProps('rememberMe')}
                    />
                    <span>Remember Me</span>
                </label>

                <Button name={'Login'} type={'submit'} color={''} />

                {captchaUrl && (
                    <div className={s.captchaUrl}>
                        <img src={captchaUrl} />
                        <input {...formik.getFieldProps('captcha')} />
                    </div>
                )}
            </form>
        </div>
    )
})
