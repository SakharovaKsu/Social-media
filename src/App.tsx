import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import {BrowserRouter, Route} from 'react-router-dom';
import News from './components/News/News';
import {DialogsContainer} from './components/Dialogs/DialogsContainer';
import {UsersContainer} from './components/Users/UsersContainer';
import {ProfileContainer} from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';


const App = () => {

    return (
        <BrowserRouter> {/*обрамляем весь компонент для route*/}
            <div className='app-wrapper'>
                <HeaderContainer/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Route path='/login' component={() => <Login/>}/>
                    {/*отрисовка компонента по клику на страничке*/}
                    {/*через render вызываем анонимную функцию, которая отрисовывает компонент*/}
                    <Route exact path='/dialogs' render={() => <DialogsContainer/>}/>

                    {/* :userId - параметр для отображения пользователя */}
                    {/* ? - означает что параметр не обязательный */}
                    <Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>
                    <Route path='/users' render={() => <UsersContainer/>}/>
                    <Route path='/news' component={News}/>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
