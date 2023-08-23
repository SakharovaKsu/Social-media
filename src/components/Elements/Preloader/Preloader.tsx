import React from 'react';
import s from '../../Users/Users.module.css';
import preloader from '../../../images/tail-spin.svg';

const Preloader = () => {
    return (
        <div>
            <img className={s.preloader} src={preloader} alt={'preloader'}/>
        </div>
    );
};

export default Preloader;