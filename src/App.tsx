import React, {FC} from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import Dialogs from "./components/Dialogs/Dialogs";
import {BrowserRouter, Route} from "react-router-dom";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import {StateType, store} from './redux/state';


type AppProps = {
    state: StateType
    // addPost: () => void
    // addMessage: (message: string) => void
    // updateNewPostText: (newText: string) => void
    dispatch: (action: any) => void
}
const App: FC<AppProps> = (props) => {

    const dialogsData = props.state.dialogsPage.dialogsData;
    const messageData = props.state.dialogsPage.messageData;
    const postData = props.state.postPage;

    return (
        <BrowserRouter> {/*обрамляем весь компонент для route*/}
            <div className='app-wrapper'>
                <Header/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    {/*отрисовка компонента по клику на страничке*/}
                    <Route exact path='/dialogs'
                           render={() => <Dialogs dialogsData={dialogsData}
                                                  messageData={messageData}
                                                  dispatch={store.dispatch.bind(store)}
                                                  // addMessage={props.addMessage}
                           />}/>
                    {/*через render вызываем анонимную функцию, которая отрисовывает компонент*/}
                    <Route path='/profile'
                           render={() =>
                               <Profile postData={postData}
                                        dispatch={store.dispatch.bind(store)}
                                        // addPost={props.addPost}
                                        // updateNewPostText={props.updateNewPostText}
                               />}/>
                    <Route path='/news' component={News}/>
                    <Route path='/music' component={Music}/>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
