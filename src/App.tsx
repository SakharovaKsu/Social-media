import React, {useEffect} from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import {BrowserRouter, Route} from 'react-router-dom';
import News from './components/News/News';
import {DialogsContainer} from './components/Dialogs/DialogsContainer';
import {UsersContainer} from './components/Users/UsersContainer';
import {ProfileContainer} from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import {useAppDispatch, useAppSelector} from './redux/reduxStore';
import {initializeAppTC} from './redux/appReducer';
import Preloader from './components/Elements/Preloader/Preloader';
import s from './components/Users/Users.module.css';

export const App = () => {

    const dispatch = useAppDispatch()
    const status = useAppSelector(state => state.app.status)

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])
    // console.log(status)

    return (
        <BrowserRouter> {/*обрамляем весь компонент для route*/}
            <div className="app-wrapper">
                <HeaderContainer />
                <Navbar />
                <div className="app-wrapper-content">
                    <div className={s.containerPreloader}>
                        {status === 'loading' && <Preloader/>}
                    </div>

                    <Route path="/login" component={() => <Login />} />
                    {/*отрисовка компонента по клику на страничке*/}
                    {/*через render вызываем анонимную функцию, которая отрисовывает компонент*/}
                    <Route exact path="/dialogs" render={() => <DialogsContainer />} />

                    {/* временная заглушка */}
                    {/*<Route path="/" render={() => <ProfileContainer />} />*/}

                    {/* :userId - параметр для отображения пользователя */}
                    {/* ? - означает что параметр не обязательный */}
                    <Route path="/profile/:userId?" render={() => <ProfileContainer />} />
                    <Route path="/users" render={() => <UsersContainer />} />
                    <Route path="/news" component={News} />
                </div>
            </div>
        </BrowserRouter>
    );
}
