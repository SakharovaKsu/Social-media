import React from 'react';
import s from './Header.module.css';

const Header = () => {
    return (
        <header className={s.header}>
            <a>
                <img src='https://img.icons8.com/flat-round/512/fox--v1.png' />
            </a>
        </header>
    )
}

export default Header;