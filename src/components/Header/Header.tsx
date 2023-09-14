import React, {FC} from 'react';
import s from './Header.module.css';
import {NavLink} from 'react-router-dom';

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
                    {/*<img  src={''} alt={'Фото пользователя.'}/>*/}
                </div>
                <div>
                    { isAuth
                        ? login
                        : <NavLink to={'/login'}></NavLink>
                    }
                </div>
            </div>
        </header>
    )
}

export default Header;