import React, {FC} from 'react';
import s from './Login.module.css'
import {useFormik} from 'formik';

type FormDataType = {
    login?: string
    password?: string
    rememberMe?: boolean
}

const LoginForm= (props: any) => {
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
        <div className={s.login}>
            <form onSubmit={formik.handleSubmit}>
                <input {...formik.getFieldProps('login')}/>
                {formik.touched.login && formik.errors.login && <div style={{color: 'red'}}>{formik.errors.login}</div>}
                <input type='password' {...formik.getFieldProps('password')}/>
                {formik.touched.password && formik.errors.password && <div style={{color: 'red'}}>{formik.errors.password}</div>}
                <div>
                    <input type={'checkbox'} checked={formik.values.rememberMe} {...formik.getFieldProps('checkbox')}/>
                    Remember Me
                </div>
                <button type={'submit'}>Login</button>
            </form>
        </div>

    )
}

const Login = () => {
    const onSubmit = (formData: any) => {

    }

    return (
        <div className={s.login}>
            <h2>Let’s Sign You In</h2>
            <LoginForm />
        </div>
    );
};

export default Login;