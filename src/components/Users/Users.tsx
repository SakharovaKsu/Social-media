import React, {FC} from 'react';
import s from './Users.module.css';
import {InitialStateUsersType, UserType} from '../../redux/usersReducer';
import Button from '../Elements/Button';
import user1 from '../../images/avatar-user/user-1.svg';
import user2 from '../../images/avatar-user/user-2.svg';
import user3 from '../../images/avatar-user/user-3.svg';
import user4 from '../../images/avatar-user/user-4.svg';
import user5 from '../../images/avatar-user/user-5.svg';

type UsersCType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    usersPage: InitialStateUsersType
    followCallback: (id: number) => void
    unfollowCallback: (id: number) => void
    onPageChanged: (p: number) => void
}

const userImages = [user1, user2, user3, user4, user5]

export const Users:FC<UsersCType> = ({
                                   totalUsersCount,
                                   pageSize,
                                   usersPage,
                                   followCallback,
                                   unfollowCallback,
                                   onPageChanged,
                                   currentPage}) => {

    const displayedUsers = () => usersPage.users.slice(0, 8);

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
                <Button className={s.buttonColor + ' ' + s.center}
                        color={'blue'}
                        name={'Other users'}
                    // callback={this.getUsers}
                />

                <div>
                    {pages.map(p => {
                        const currentPageHandler = () => {
                            onPageChanged(p)
                        }

                        if (p === 1 || p === pagesCount || (p >= currentPage - 2 && p <= currentPage + 2)) {

                            return (
                                (p === 1 || p === pagesCount || (p >= currentPage - 2 && p <= currentPage + 2))
                                    ? <span
                                        key={p}
                                        className={currentPage === p ? s.buttonActive : ''}
                                        onClick={currentPageHandler}>{p} </span>
                                    : (p === currentPage - 3 || p === currentPage + 3)
                                        ? <span key={p}>... </span>
                                        : null
                            );
                        }
                    })}
                </div>
            </div>
        </div>
    );
};
