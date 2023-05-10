import React, {FC} from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import Dialogs from "./components/Dialogs/Dialogs";
import {BrowserRouter, Route} from "react-router-dom";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import {StateType} from "./redax/state";

type AppState = {
    state: StateType
}
const App:FC<AppState> = (props) => {

    const dialogsData = props.state.dialogsPage.dialogsData;
    const messageData = props.state.dialogsPage.messageData;
    const postsData = props.state.postPage.postsData;

    return (
        <BrowserRouter> {/*обромляем весь компонент для route*/}
            <div className='app-wrapper'>
                <Header/>
                <Navbar />
                <div className='app-wrapper-content'>
                    {/*отрисовка компонента по клику на стриничке*/}
                    <Route exact path='/dialogs' render={() => <Dialogs dialogsData={dialogsData} messageData={messageData} />} />
                    {/*через render вызываем ананимную функцию, которая отрисовывает компонент*/}
                    <Route path='/profile' render={() => <Profile postsData={postsData} />} />
                    <Route path='/news' component={News} />
                    <Route path='/music' component={Music} />
              </div>
          </div>
      </BrowserRouter>
  );
}

export default App;
