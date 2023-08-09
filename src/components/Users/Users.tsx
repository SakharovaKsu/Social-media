import React, {FC} from 'react';
import s from './Music.module.css';
import {InitialStateUsersType, UserType} from '../../redux/usersReducer';

type UsersType = {
    usersPage: InitialStateUsersType;
    followCallback: (userId: string) => void;
    unfollowCallback: (userId: string) => void;
    setUsersCallback: (users: UserType[]) => void;
}

const Users: FC<UsersType> = ({usersPage, followCallback, unfollowCallback, setUsersCallback}) => {
    return (
        <ul>
            {usersPage.users.map(u => {
                return <li key={u.id}>
                    <div>
                        <img src={u.src} alt={'Фото пользователя.'}/>
                        <button>Follow</button>
                    </div>
                    <div>
                        <h3>{u.name}</h3>
                        <p>{u.location.country + ' ' + u.location.city}</p>
                        <p>{u.status}</p>
                    </div>
                </li>
            })}
        </ul>
    )
}

export default Users;