import React, { FC } from 'react'
import s from './Users.module.css'
import { InitialStateUsersType, UserType } from '../../redux/usersReducer'
import Paginator from '../Elements/Paginator/Paginator'
import User from './User/User'

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
                            return (
                                <User
                                    key={u.id}
                                    user={u}
                                    followingInProgress={followingInProgress}
                                    followTC={followTC}
                                    unfollowTC={unfollowTC}
                                />
                            )
                        })}
                    </ul>

                    <Paginator
                        usersPage={usersPage}
                        totalUsersCount={totalUsersCount}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChanged={onPageChanged}
                    />
                </div>
            </div>
        )
    },
)
