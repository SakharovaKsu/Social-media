import { useAppDispatch, useAppSelector } from './redux/reduxStore'
import { isInitializedSelector, statusSelector } from './redux/selectors/appSelector'
import React, { useEffect } from 'react'
import { initializeAppTC } from './redux/appReducer'
import Preloader from './components/Elements/Preloader/Preloader'
import { BrowserRouter, Redirect, Route } from 'react-router-dom'
import HeaderContainer from './components/Header/HeaderContainer'
import Navbar from './components/Navbar/Navbar'
import Login from './components/Login/Login'
import { DialogsContainer } from './components/Dialogs/DialogsContainer'
import { ProfileContainer } from './components/Profile/ProfileContainer'
import { UsersContainer } from './components/Users/UsersContainer'
import News from './components/News/News'
import NotFound from './components/NotFound/NotFound'

export const AppContainer = () => {
    const dispatch = useAppDispatch()
    const status = useAppSelector(statusSelector)
    const isInitialized = useAppSelector(isInitializedSelector)

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    if (!isInitialized) {
        return (
            <div className={'containerPreloader'}>
                <Preloader />
            </div>
        )
    }

    return (
        <BrowserRouter>
            {/*обрамляем весь компонент для route*/}
            <div className="app-wrapper">
                <HeaderContainer />
                <Navbar />
                <div className="app-wrapper-content">
                    {status === 'loading' && (
                        <div className={'containerPreloader'}>
                            <Preloader />
                        </div>
                    )}

                    <Route path="/login" component={() => <Login />} />
                    <Route exact path="/" render={() => <Redirect to={'/profile'} />} />

                    {/* :userId - параметр для отображения пользователя */}
                    {/* ? - означает что параметр не обязательный */}
                    <Route path="/profile/:userId?" render={() => <ProfileContainer />} />

                    {/*отрисовка компонента по клику на страничке*/}
                    {/*через render вызываем анонимную функцию, которая отрисовывает компонент*/}
                    <Route exact path="/dialogs" render={() => <DialogsContainer />} />
                    <Route path="/users" render={() => <UsersContainer />} />
                    <Route path="/news" component={News} />
                    <Route path="*" component={NotFound} />
                </div>
            </div>
        </BrowserRouter>
    )
}
