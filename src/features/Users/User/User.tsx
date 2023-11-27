import React, { FC } from 'react'
import s from './User.module.css'
import { UserType } from '../../../common/redux/usersReducer'
import { NavLink } from 'react-router-dom'
import user1 from '../../../images/avatar-user/user-1.svg'
import Button from '../../Elements/Button/Button'

type UserComponentType = {
    user: UserType
    followingInProgress: number[]
    followTC: (id: number) => void
    unfollowTC: (id: number) => void
}

const User: FC<UserComponentType> = ({ user, followTC, unfollowTC, followingInProgress }) => {
    const followHandler = () => followTC(user.id)
    const unfollowHandler = () => unfollowTC(user.id)
    const followingInProgressUser = followingInProgress.some((id) => id === user.id)

    const statusUser = !user.status || null ? 'no status' : user.status

    return (
        <li key={user.id} className={s.item}>
            <div className={s.container}>
                <NavLink to={'/profile/' + user.id}>
                    <img className={s.img} src={user.photos.small || user1} alt={'Фото пользователя.'} />
                </NavLink>
                <div>
                    <h3 className={s.name}>{user.name}</h3>
                    <p className={s.description}>{statusUser}</p>
                </div>
            </div>
            <div className={s.boxButton}>
                {user.followed ? (
                    <Button
                        color={'white'}
                        name={'Unfollow'}
                        disabledButton={followingInProgressUser}
                        callback={unfollowHandler}
                    />
                ) : (
                    <Button
                        color={'white'}
                        name={'Follow'}
                        disabledButton={followingInProgressUser}
                        callback={followHandler}
                    />
                )}
                <Button color={'blue'} name={'Message'} />
            </div>
        </li>
    )
}

export default User
