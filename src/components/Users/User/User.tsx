import React, { FC } from 'react'
import s from './User.module.css'
import { UserType } from '../../../redux/usersReducer'
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

    return (
        <li key={user.id} className={s.item}>
            <div className={s.container}>
                <NavLink to={'/profile/' + user.id}>
                    <img className={s.img} src={user.photos.small || user1} alt={'Фото пользователя.'} />
                </NavLink>
                <div>
                    <h3 className={s.name}>{user.name}</h3>
                    <p className={s.text}>{'u.location.country' + ' ' + 'u.location.city'}</p>
                    <p className={s.description}>{user.status}</p>
                </div>
            </div>
            <div className={s.boxButton}>
                {user.followed ? (
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
}

export default User
