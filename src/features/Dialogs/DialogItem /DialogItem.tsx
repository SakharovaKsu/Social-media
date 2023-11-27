import React, { FC } from 'react'
import s from './DialogItem.module.css'
import { NavLink } from 'react-router-dom'

type DialogType = {
    name: string
    id: string
    src: string
}
const DialogItem: FC<DialogType> = (props) => {
    return (
        <li className={s.item}>
            <img className={s.img} src={props.src} />
            <NavLink className={s.link} to={`dialogs/${props.id}`}>
                {props.name}
            </NavLink>
        </li>
    )
}

export default DialogItem
