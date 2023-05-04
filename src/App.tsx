import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import Dialogs from "./components/Dialogs/Dialogs";
import {BrowserRouter, Route} from "react-router-dom";
import News from "./components/News/News";
import Music from "./components/Music/Music";

const App = () => {
  return (
      <BrowserRouter> {/*обромляем весь компонент для route*/}
          <div className='app-wrapper'>
             <Header/>
              <Navbar />
              <div className='app-wrapper-content'>
                  {/*отрисовка компонента по клику на стриничке*/}
                  <Route path='/dialogs' component={Dialogs} />
                  <Route path='/profile' component={Profile} />
                  <Route path='/news' component={News} />
                  <Route path='/music' component={Music} />
              </div>
          </div>
      </BrowserRouter>
  );
}

// Типизируем, что должно попасть в пропс
// type PageTitlePropsType = {
//   title: string
// }

export default App;
