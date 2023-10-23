import React, { FC } from 'react'
import s from './Users.module.css'
import { InitialStateUsersType, UserType } from '../../redux/usersReducer'
import Button from '../Elements/Button/Button'
import user1 from '../../images/avatar-user/user-1.svg'
import ButtonPagination from '../Elements/ButtonPagination/ButtonPagination'
import { NavLink } from 'react-router-dom'

type UsersCType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    usersPage: InitialStateUsersType
    onPageChanged: (p: number) => void
    followingInProgress: number[]
    followTC: (id: number) => void
    unfollowTC: (id: number) => void
}

export const Users: FC<UsersCType> = React.memo(
    ({
        totalUsersCount,
        pageSize,
        usersPage,
        onPageChanged,
        currentPage,
        followingInProgress,
        followTC,
        unfollowTC,
    }) => {
        const displayedUsers = () => usersPage.users.slice(0, 8)

        // Узнаем количество пользователь, для понимая сколько нам нужно кнопок
        let pagesCount = Math.ceil(totalUsersCount / pageSize)

        // Заполняем массив для пагинации
        let pages = []
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i)
        }

        return (
            <div className={s.users}>
                <h2 className={s.title}>Users list</h2>
                <div className={s.box}>
                    <ul className={s.list}>
                        {displayedUsers().map((u: UserType) => {
                            const followHandler = () => followTC(u.id)
                            const unfollowHandler = () => unfollowTC(u.id)
                            const followingInProgressUser = followingInProgress.some((id) => id === u.id)

                            return (
                                <li key={u.id} className={s.item}>
                                    <div className={s.container}>
                                        <NavLink to={'/profile/' + u.id}>
                                            <img
                                                className={s.img}
                                                src={u.photos.small || user1}
                                                alt={'Фото пользователя.'}
                                            />
                                        </NavLink>
                                        <div>
                                            <h3 className={s.name}>{u.name}</h3>
                                            <p className={s.text}>{'u.location.country' + ' ' + 'u.location.city'}</p>
                                            <p className={s.description}>{u.status}</p>
                                        </div>
                                    </div>
                                    <div className={s.boxButton}>
                                        {u.followed ? (
                                            <Button
                                                className={s.buttonNoColor}
                                                color={'white'}
                                                name={'Unfollow'}
                                                followingInProgress={followingInProgressUser}
                                                callback={unfollowHandler}
                                            />
                                        ) : (
                                            <Button
                                                className={s.buttonNoColor}
                                                color={'white'}
                                                name={'Follow'}
                                                followingInProgress={followingInProgressUser}
                                                callback={followHandler}
                                            />
                                        )}
                                        <Button className={s.buttonColor} color={'blue'} name={'Message'} />
                                    </div>
                                </li>
                            )
                        })}
                    </ul>

                    <div>
                        {pages.map((p) => {
                            const currentPageHandler = () => {
                                onPageChanged(p)
                            }

                            if (p === 1 || p === pagesCount || (p >= currentPage - 2 && p <= currentPage + 1)) {
                                const styleActiveButton = currentPage === p ? true : false
                                return p === 1 || p === pagesCount || (p >= currentPage - 2 && p <= currentPage + 1) ? (
                                    <ButtonPagination
                                        key={p}
                                        buttonActive={styleActiveButton}
                                        name={p.toString()}
                                        callback={currentPageHandler}
                                    />
                                ) : p === currentPage - 2 || p === currentPage + 2 ? (
                                    <ButtonPagination key={p} name={'...'} />
                                ) : null
                            }
                        })}
                    </div>
                </div>
            </div>
        )
    },
)
