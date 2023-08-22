import React from 'react';
import s from './Users.module.css';
import {UserType} from '../../redux/usersReducer';
import user1 from '../../images/avatar-user/user-1.svg';
import user3 from '../../images/avatar-user/user-3.svg';
import user2 from '../../images/avatar-user/user-2.svg';
import user5 from '../../images/avatar-user/user-5.svg';
import user4 from '../../images/avatar-user/user-4.svg';
import Button from '../Elements/Button';
import axios from 'axios';

const userImages = [user1, user2, user3, user4, user5]

class UsersC extends React.Component<any, any>{

    // ? - после вопроса идет get-параметр, 'ключ'='значение' (то, что запрашиваем у сервера), &-разделительный символ
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                // сетаем
                this.props.setUsersCallback(response.data.items)
                this.props.setUsersTotalCountCallback(response.data.totalCount)
            })
    }

    onPageChanged = (pageNumber: number) => {
        this.props.setCurrentPageCallback(pageNumber)

        // делаем запрос на сервер для текущей странице по клике
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsersCallback(response.data.items)
            })
    }

    displayedUsers = () => this.props.usersPage.users.slice(0, 8);

    render() {

        // Узнаем количество пользователь, для понимая сколько нам нужно кнопок
        let pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize)

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
                        {this.displayedUsers().map((u: UserType) => {

                            const followHandler = () => {
                                this.props.followCallback(u.id)
                            }

                            const unfollowHandler = () => {
                                this.props.unfollowCallback(u.id)
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
                                this.onPageChanged(p)
                            }

                            if (p === 1 || p === pagesCount || (p >= this.props.currentPage - 2 && p <= this.props.currentPage + 2)) {

                                return (
                                    (p === 1 || p === pagesCount || (p >= this.props.currentPage - 2 && p <= this.props.currentPage + 2))
                                        ? <span
                                            key={p}
                                            className={this.props.currentPage === p ? s.buttonActive : ''}
                                            onClick={currentPageHandler}>{p} </span>
                                        : (p === this.props.currentPage - 3 || p === this.props.currentPage + 3)
                                            ? <span key={p}>... </span>
                                            : null
                                );
                            }
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

export default UsersC;