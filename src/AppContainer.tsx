import { useAppDispatch, useAppSelector } from './common/redux/store'
import { isInitializedSelector, statusSelector } from './common/redux/selectors/appSelector'
import React, { useEffect } from 'react'
import { initializeAppTC } from './common/redux/appReducer'
import Preloader from './features/Elements/Preloader/Preloader'
import { BrowserRouter, Redirect, Route, Switch as Routes } from 'react-router-dom'
import HeaderContainer from './features/Header/HeaderContainer'
import Navbar from './features/Navbar/Navbar'
import Login from './features/Login/Login'
import { DialogsContainer } from './features/Dialogs/DialogsContainer'
import { ProfileContainer } from './features/Profile/ProfileContainer'
import { UsersContainer } from './features/Users/UsersContainer'
import News from './features/News/News'
import NotFound from './features/NotFound/NotFound'

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
            <div className="app-wrapper">
                <HeaderContainer />
                <Navbar />
                <div className="app-wrapper-content">
                    {status === 'loading' && (
                        <div className={'containerPreloader'}>
                            <Preloader />
                        </div>
                    )}
                    <Routes>
                        <Route exact path="/" render={() => <Redirect to={'/profile'} />} />
                        <Route path="/profile/:userId?" render={() => <ProfileContainer />} />
                        <Route path="/login" render={() => <Login />} />
                        <Route path="/dialogs" render={() => <DialogsContainer />} />
                        <Route path="/users" render={() => <UsersContainer />} />
                        <Route path="/news" render={() => News} />
                        <Route path="*" render={() => <NotFound />} />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    )
}
