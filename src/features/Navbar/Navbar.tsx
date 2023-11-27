import React, { FC } from 'react'
import s from './Navbar.module.css'
import { NavLink } from 'react-router-dom'

type NavItemType = {
    to: string
    name: string
}

const NavItem: FC<NavItemType> = ({ to, name }) => {
    return (
        <li className={s.item}>
            <NavLink to={to} activeClassName={s.active}>
                {name}
            </NavLink>
        </li>
    )
}

const Navbar = () => {
    return (
        <nav className={s.nav}>
            <ul className={s.list}>
                <NavItem to="/profile" name="Profile" />
                <NavItem to="/dialogs" name="Messages" />
                <NavItem to="/news" name="News" />
                <NavItem to="/users" name="Users" />
            </ul>
        </nav>
    )
}

export default Navbar
