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
import axios from 'axios';

const userImages = [user1, user2, user3, user4, user5]

type UsersType = {
    usersPage: InitialStateUsersType;
    followCallback: (userId: number) => void;
    unfollowCallback: (userId: number) => void;
    setUsersCallback: (users: UserType[]) => void;
}

const Users: FC<UsersType> = ({usersPage, followCallback, unfollowCallback, setUsersCallback}) => {

    if(usersPage.users.length === 0) {

        // берем пользователей из сервака
        axios.get('https://social-network.samuraijs.com/api/1.0/users')
            .then(response => {
                setUsersCallback(response.data.items)
            })

        // setUsersCallback([
        //     {
        //         id: 1,
        //         name: 'Terry McDaniel',
        //         src: user1,
        //         status: 'This headline will attract the right',
        //         followed: false,
        //         location: {country: 'Russia', city: 'Moscow'}
        //     },
        //     {
        //         id: 2,
        //         name: 'Randy Russell',
        //         src: user3,
        //         status: 'This headline will attract the right',
        //         followed: false,
        //         location: {country: 'Russia', city: 'Moscow'}
        //     },
        //     {
        //         id: 3,
        //         name: 'Charlotte Peters',
        //         src: user2,
        //         status: 'This headline will attract the right',
        //         followed: true,
        //         location: {country: 'Russia', city: 'Moscow'}
        //     },
        //     {
        //         id: 4,
        //         name: 'Pearl Ward',
        //         src: user5,
        //         status: 'This headline will attract the right',
        //         followed: true,
        //         location: {country: 'Russia', city: 'Moscow'}
        //     },
        //     {
        //         id: 5,
        //         name: 'Martha Gross',
        //         src: user4,
        //         status: 'This headline will attract the right',
        //         followed: true,
        //         location: {country: 'Russia', city: 'Moscow'}
        //     },
        // ])
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

                        // Генерируем случайное число от 0 до 4
                        const randomIndex = Math.floor(Math.random() * 4);

                        return (
                            <li key={u.id} className={s.item}>
                                <div className={s.container}>
                                    <img className={s.img} src={u.photos.small !== 'small' ? userImages[randomIndex] : ''} alt={'Фото пользователя.'}/>
                                    <div>
                                        <h3 className={s.name}>{u.name}</h3>
                                        <p className={s.text}>
                                            {'u.location.country' + ' ' + 'u.location.city'}
                                        </p>
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