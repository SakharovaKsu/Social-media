import React, {FC} from 'react';
import s from './Header.module.css';
import {NavLink} from 'react-router-dom';
import user from '../../images/avatar-user/user-5.svg';
import {logOutTC} from '../../redux/authReducer';
import {useAppDispatch} from '../../redux/reduxStore';

type HeaderType = {
    isAuth: boolean
    login: string | null
}

const Header: FC<HeaderType> = ({isAuth, login}) => {

    const dispatch = useAppDispatch()

    const logOutHandler = () => {
        dispatch(logOutTC())
    }

    return (
        <header className={s.header}>
            <a>
                <img src='https://i.ibb.co/BThLGnf/Logo.png' />
            </a>
            <div className={s.loginBlock}>
                <div className={s.container}>
                    { !isAuth
                        ? <span>login</span>
                        : <div className={s.loginContainer}>
                            <div className={s.imgUser}>
                                <img  src={user} alt={'Фото пользователя.'}/>
                            </div>
                            <NavLink to={'/profile'}>{login}</NavLink>
                        </div>
                    }
                    {isAuth && <button className={s.button} type={'button'} onClick={logOutHandler}>Log out</button>}
                </div>
            </div>
        </header>
    )
}

export default Header;