import React, {FC} from 'react';
import s from "./Message.module.css";
import {MessageDataType} from "../../../redax/state";

const Message:FC<MessageDataType> = (props) => {
    return <div className={s.message}>{props.message}</div>
};

export default Message;