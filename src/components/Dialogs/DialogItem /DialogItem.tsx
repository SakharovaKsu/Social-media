import React, {FC} from 'react';
import s from "../Dialogs.module.css";
import {NavLink} from "react-router-dom";
import {dialogsDataType} from "../../../redax/state";

const DialogItem:FC<dialogsDataType> = (props) => {
    return (
        <li className={s.item}>
            <NavLink className={s.link} to={`dialogs/${props.id}`}>{props.name}</NavLink>
        </li>
    )
}

export default DialogItem;