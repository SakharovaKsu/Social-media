import React from 'react';
import preloader from '../../../images/tail-spin.svg';

const Preloader = () => {
    return (
        <div>
            <img src={preloader} alt={'preloader'}/>
        </div>
    );
};

export default Preloader;