import React, { FC } from 'react'
import s from './ButtonSmall.module.css'

type ButtonPaginationType = {
    name: string
    callback?: () => void
    buttonActive?: boolean
    type: 'button' | 'submit' | 'reset' | undefined
}

const ButtonSmall: FC<ButtonPaginationType> = ({ name, callback, buttonActive, type }) => {
    return (
        <>
            <button
                className={`${s.buttonPagination} ${buttonActive ? s.buttonActive : ''}`}
                type={type}
                onClick={callback}
            >
                {name}
            </button>
        </>
    )
}

export default ButtonSmall
