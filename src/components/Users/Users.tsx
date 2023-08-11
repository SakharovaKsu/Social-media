import React, {FC} from 'react';
import s from './Users.module.css';
import {InitialStateUsersType, UserType} from '../../redux/usersReducer';
import {v1} from 'uuid';
import user1 from '../../images/avatar-user/user-1.svg';
import user3 from '../../images/avatar-user/user-3.svg';
import user2 from '../../images/avatar-user/user-2.svg';
import user5 from '../../images/avatar-user/user-5.svg';
import user4 from '../../images/avatar-user/user-4.svg';
import Button from '../Elements/Button';

type UsersType = {
    usersPage: InitialStateUsersType;
    followCallback: (userId: string) => void;
    unfollowCallback: (userId: string) => void;
    setUsersCallback: (users: UserType[]) => void;
}

const Users: FC<UsersType> = ({usersPage, followCallback, unfollowCallback, setUsersCallback}) => {

    if(usersPage.users.length === 0) {
        setUsersCallback([
            {
                id: v1(),
                name: 'Terry McDaniel',
                src: user1,
                status: 'This headline will attract the right',
                followed: false,
                location: {country: 'Russia', city: 'Moscow'}
            },
            {
                id: v1(),
                name: 'Randy Russell',
                src: user3,
                status: 'This headline will attract the right',
                followed: false,
                location: {country: 'Russia', city: 'Moscow'}
            },
            {
                id: v1(),
                name: 'Charlotte Peters',
                src: user2,
                status: 'This headline will attract the right',
                followed: true,
                location: {country: 'Russia', city: 'Moscow'}
            },
            {
                id: v1(),
                name: 'Pearl Ward',
                src: user5,
                status: 'This headline will attract the right',
                followed: true,
                location: {country: 'Russia', city: 'Moscow'}
            },
            {
                id: v1(),
                name: 'Martha Gross',
                src: user4,
                status: 'This headline will attract the right',
                followed: true,
                location: {country: 'Russia', city: 'Moscow'}
            },
        ])
    }

    // Отображаем определенное количество пользователей
    const displayedUsers = usersPage.users.slice(0, 12);

    return (
        <div className={s.users}>
            <h2 className={s.title}>Users list</h2>
            <div className={s.box}>
                <ul className={s.list}>
                    {displayedUsers.map(u => {

                        const followHandler = () => {
                            followCallback(u.id)
                        }

                        const unfollowHandler = () => {
                            unfollowCallback(u.id)
                        }

                        return (
                            <li key={u.id} className={s.item}>
                                <div className={s.container}>
                                    <img className={s.img} src={u.src} alt={'Фото пользователя.'}/>
                                    <div>
                                        <h3 className={s.name}>{u.name}</h3>
                                        <p className={s.text}>{u.location.country + ' ' + u.location.city}</p>
                                        <p className={s.description}>{u.status}</p>
                                    </div>
                                </div>
                                <div className={s.boxButton}>
                                    {u.followed
                                        ? <Button className={s.buttonNoColor} color={'white'} name={'Unfollow'} callback={unfollowHandler}/>
                                        : <Button className={s.buttonNoColor} color={'white'} name={'Follow'} callback={followHandler} />
                                    }
                                    <Button className={s.buttonColor} color={'blue'} name={'Message'}/>
                                </div>
                            </li>
                        )
                    })}
                </ul>
                <Button className={s.buttonColor + ' ' + s.center} color={'blue'} name={'Other users'}/>
            </div>
        </div>
    )
}

export default Users;