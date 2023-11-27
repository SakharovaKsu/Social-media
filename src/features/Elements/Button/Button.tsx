import React, { FC } from 'react'
import s from './Button.module.css'

type ButtonType = {
    name: string
    callback?: () => void
    color?: string
    buttonSize?: string
    disabledButton?: boolean
    type?: 'button' | 'submit' | 'reset' | undefined
}

const Button: FC<ButtonType> = ({ name, callback, color, disabledButton, type, buttonSize }) => {
    const finalClassName =
        s.button +
        ' ' +
        (color === 'white' ? s.white : s.blue) +
        ' ' +
        (buttonSize === 'small' ? s.buttonSmall : s.buttonBig)

    return (
        <>
            <button className={finalClassName} type={type || 'button'} disabled={disabledButton} onClick={callback}>
                {name}
            </button>
        </>
    )
}

export default Button
