import React, { FC } from 'react'
import s from './Button.module.css'

type ButtonType = {
    name: string
    callback?: () => void
    className?: string
    color?: string
    followingInProgress?: boolean
    type?: 'button' | 'submit' | 'reset' | undefined
}

const Button: FC<ButtonType> = ({ name, callback, className, color, followingInProgress, type }) => {
    const finalClassName = s.button + ' ' + (color === 'white' ? s.white : s.blue)

    return (
        <>
            <button
                className={finalClassName + ' ' + className}
                type={type || 'button'}
                disabled={followingInProgress}
                onClick={callback}
            >
                {name}
            </button>
        </>
    )
}

export default Button
