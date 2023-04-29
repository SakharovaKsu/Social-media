import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";

const App = () => {
  return (
    <div className='app-wrapper'>
        <Header/>
        <Navbar />
        <Profile />
    </div>
  );
}

// Типизируем, что должно попасть в пропс
// type PageTitlePropsType = {
//   title: string
// }

export default App;
