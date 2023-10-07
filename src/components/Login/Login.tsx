import React, {FC} from 'react';
import s from './Login.module.css'
import {useFormik} from 'formik';
import Button from '../Elements/Button/Button';
import {useAppDispatch, useAppSelector} from '../../redux/reduxStore';
import {loginTC} from '../../redux/authReducer';

type FormDataType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

const LoginForm= () => {

    const isLoggedIn = useAppSelector(state => state.auth.isAuth)
    const dispatch = useAppDispatch()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
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
                errors.password = 'Must be more 3 symbols'
            }
            return errors
        },
        onSubmit: values => {
            dispatch(loginTC(values))

            // очищаем форму после отправки
            formik.resetForm()
        },
    })

    return (
        <div>
            <form className={s.form} onSubmit={formik.handleSubmit}>
                <div className={s.containerInput}>
                    <input className={s.input} {...formik.getFieldProps('email')}/>
                    {formik.touched.email && formik.errors.email && <span className={s.spanError}>{formik.errors.email}</span>}
                </div>
                <div className={s.containerInput}>
                    <input className={s.input} type='password' {...formik.getFieldProps('password')}/>
                    {formik.touched.password && formik.errors.password && <span className={s.spanError}>{formik.errors.password}</span>}
                </div>
                <label className={s.label}>
                    <input type={'checkbox'} checked={formik.values.rememberMe} {...formik.getFieldProps('rememberMe')}/>
                    <span>Remember Me</span>
                </label>

                <Button name={'Login'} type={'submit'} color={''}/>
            </form>
        </div>

    )
}

const Login = () => {

    return (
        <div className={s.login}>
            <div className={s.containerLogin}>
                <h2 className={s.title}>Let’s Sign You In</h2>
                <p className={s.subtitle}>Welcome back, we missed you!</p>
                <LoginForm />
            </div>
        </div>
    );
};

export default Login;