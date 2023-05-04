import React from 'react';
import s from './Header.module.css';

const Header = () => {
    return (
        <header className={s.header}>
            <a>
                <img src='https://i.ibb.co/BThLGnf/Logo.png' />
            </a>
        </header>
    )
}

export default Header;