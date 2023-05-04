import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import Dialogs from "./components/Dialogs/Dialogs";
import {BrowserRouter, Route} from "react-router-dom";

const App = () => {
  return (
      <BrowserRouter> // обромляем весь компонент для route
          <div className='app-wrapper'>
             <Header/>
              <Navbar />
              <div className='app-wrapper-content'>
                  {/*отрисовка компонента по клику*/}
                  <Route path='/dialogs' component={Dialogs} />
                  <Route path='/profile' component={Profile} />
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
