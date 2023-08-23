import React, {FC} from 'react';
import s from './Button.module.css';

type ButtonType = {
    name: string
    callback?: () => void
    className?: string
    color: string
}

const Button:FC<ButtonType> = ({name, callback, className, color}) => {

    const finalClassName = s.button
        + ' ' + (color === 'white' ? s.white : s.blue)

    return (
        <>
            <button className={finalClassName + ' ' + className}
                    onClick={callback}>
                {name}
            </button>
        </>
    )
};

export default Button;