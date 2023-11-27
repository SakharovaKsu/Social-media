import React, { FC, useCallback } from 'react'
import s from './Header.module.css'
import { NavLink } from 'react-router-dom'
import user from '../../images/avatar-user/user-5.svg'
import { logOutTC } from '../../common/redux/authReducer'
import { useAppDispatch, useAppSelector } from '../../common/redux/store'
import { photoUserSelector, photoUserSmallSelector, UserSelector } from '../../common/redux/selectors/postPageSelector'
import { idUserSelector } from '../../common/redux/selectors/authSelector'

type HeaderType = {
    isAuth: boolean
    login: string | null
}

const Header: FC<HeaderType> = React.memo(({ isAuth, login }) => {
    const dispatch = useAppDispatch()
    const photoUser = useAppSelector(photoUserSmallSelector)
    const userIdPostPage = useAppSelector(UserSelector)
    const userId = useAppSelector(idUserSelector)

    const avatarUser = userId === userIdPostPage ? photoUser : user

    const logOutHandler = useCallback(() => {
        dispatch(logOutTC())
    }, [])

    return (
        <header className={s.header}>
            <a>
                <img src="https://i.ibb.co/BThLGnf/Logo.png" />
            </a>
            <div className={s.loginBlock}>
                <div className={s.container}>
                    {!isAuth ? (
                        <span>login</span>
                    ) : (
                        <div className={s.loginContainer}>
                            <div className={s.imgUser}>
                                <img src={avatarUser} alt={'Фото пользователя.'} />
                            </div>
                            <NavLink to={'/profile'}>{login}</NavLink>
                        </div>
                    )}
                    {isAuth && (
                        <button className={s.button} type={'button'} onClick={logOutHandler}>
                            Log out
                        </button>
                    )}
                </div>
            </div>
        </header>
    )
})

export default Header
