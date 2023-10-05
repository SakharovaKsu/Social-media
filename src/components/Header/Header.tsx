import React, {FC} from 'react';
import s from './Header.module.css';
import {NavLink} from 'react-router-dom';
import user from '../../images/avatar-user/user-5.svg';

type HeaderType = {
    isAuth: boolean
    login: string | null
}

const Header: FC<HeaderType> = ({isAuth, login}) => {
    return (
        <header className={s.header}>
            <a>
                <img src='https://i.ibb.co/BThLGnf/Logo.png' />
            </a>
            <div className={s.loginBlock}>
                <div className={s.imgUser}>
                    <img  src={user} alt={'Фото пользователя.'}/>
                </div>
                <div>
                    { !isAuth
                        ? <span>login</span>
                        : <NavLink to={'/login'}>{login}</NavLink>
                    }
                </div>
            </div>
        </header>
    )
}

export default Header;