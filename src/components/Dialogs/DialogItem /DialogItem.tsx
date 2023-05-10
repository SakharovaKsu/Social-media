import React from 'react';
import s from "../Dialogs.module.css";
import {NavLink} from "react-router-dom";

const DialogItem = (props: any) => {
    return (
        <li className={s.item}>
            <NavLink className={s.link} to={`dialogs/${props.id}`}>{props.name}</NavLink>
        </li>
    )
}

export default DialogItem;