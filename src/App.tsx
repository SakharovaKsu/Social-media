import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import Dialogs from "./components/Dialogs/Dialogs";
import {BrowserRouter, Route} from "react-router-dom";
import News from "./components/News/News";
import Music from "./components/Music/Music";

const App = (props:any) => {

  return (
      <BrowserRouter> {/*обромляем весь компонент для route*/}
          <div className='app-wrapper'>
             <Header/>
              <Navbar />
              <div className='app-wrapper-content'>
                  {/*отрисовка компонента по клику на стриничке*/}
                  <Route exact path='/dialogs' render={() => <Dialogs dialogsData={props.dialogsData} messageData={props.messageData} />} />
                  {/*через render вызываем ананимную функцию, которая отрисовывает компонент*/}
                  <Route path='/profile' render={() => <Profile postsData={props.postsData} />} />
                  <Route path='/news' component={News} />
                  <Route path='/music' component={Music} />
              </div>
          </div>
      </BrowserRouter>
  );
}

export default App;
