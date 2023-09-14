import React, {FC} from 'react';
import s from './ButtonPagination.module.css';

type ButtonPaginationType = {
    name: string
    callback?: () => void
    buttonActive?: boolean
}

const ButtonPagination:FC<ButtonPaginationType> = ({name, callback, buttonActive}) => {

    return (
        <>
            <button className={`${s.buttonPagination} ${buttonActive ? s.buttonActive : ''}`}
                    onClick={callback}>
                {name}
            </button>
        </>
    )
};

export default ButtonPagination;