import React, {FC} from 'react';
import s from './Login.module.css'
import {useFormik} from 'formik';
import Button from '../Elements/Button/Button';

type FormDataType = {
    login?: string
    password?: string
    rememberMe?: boolean
}

const LoginForm= () => {

    const formik = useFormik({
        initialValues: {
            login: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            const errors: FormDataType = {}
            const regx = /^[A-Z][a-z]{1,}$/
            if (!values.login) {
                errors.login = 'Required'
            } else if (!regx.test(values.login)) {
                errors.login = 'Invalid first name'
            }

            if (!values.password) {
                errors.login = 'Required'
            } else if (values.password.length < 4) {
                errors.password = 'Must be more 3 symbols'
            }
            return errors
        },
        onSubmit: values => {
            // еще не писала
            // dispatch(loginTC(values))

            // очищаем форму после отправки
            formik.resetForm()
        },
    })

    return (
        <div>
            <form className={s.form} onSubmit={formik.handleSubmit}>
                <div className={s.containerInput}>
                    <input className={s.input} {...formik.getFieldProps('login')}/>
                    {formik.touched.login && formik.errors.login && <span className={s.spanError}>{formik.errors.login}</span>}
                </div>
                <div className={s.containerInput}>
                    <input className={s.input}  type='password' {...formik.getFieldProps('password')}/>
                    {formik.touched.password && formik.errors.password && <span className={s.spanError}>{formik.errors.password}</span>}
                </div>
                <label className={s.label}>
                    <input type={'checkbox'} checked={formik.values.rememberMe} {...formik.getFieldProps('checkbox')}/>
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