import React, {FC} from 'react';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import {BrowserRouter, Route} from 'react-router-dom';
import News from './components/News/News';
import Music from './components/Music/Music';
import {StoreType} from './redux/redux-store';
import DialogsContainer from './components/Dialogs/DialogsContainer';


const App = () => {

    return (
        <BrowserRouter> {/*обрамляем весь компонент для route*/}
            <div className='app-wrapper'>
                <Header/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    {/*отрисовка компонента по клику на страничке*/}
                    {/*через render вызываем анонимную функцию, которая отрисовывает компонент*/}
                    <Route exact path='/dialogs' render={() => <DialogsContainer/>}/>
                    <Route path='/profile' render={() => <Profile/>}/>
                    <Route path='/news' component={News}/>
                    <Route path='/music' component={Music}/>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
