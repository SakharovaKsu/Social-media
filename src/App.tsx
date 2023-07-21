import React, {FC} from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import Dialogs from "./components/Dialogs/Dialogs";
import {BrowserRouter, Route} from "react-router-dom";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import {AllActionType, StateType} from './redux/state';


type AppProps = {
    store: StateType
    dispatch: (action: AllActionType) => void
}
const App: FC<AppProps> = ({store, dispatch}) => {

    return (
        <BrowserRouter> {/*обрамляем весь компонент для route*/}
            <div className='app-wrapper'>
                <Header/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    {/*отрисовка компонента по клику на страничке*/}
                    <Route exact path='/dialogs'
                           render={() => <Dialogs dialogsData={store.dialogsPage.dialogsData}
                                                  messageData={store.dialogsPage.messageData}
                                                  dispatch={dispatch.bind(store)}
                           />}/>
                    {/*через render вызываем анонимную функцию, которая отрисовывает компонент*/}
                    <Route path='/profile'
                           render={() =>
                               <Profile postData={store.postPage}
                                        dispatch={dispatch.bind(store)}
                               />}/>
                    <Route path='/news' component={News}/>
                    <Route path='/music' component={Music}/>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
