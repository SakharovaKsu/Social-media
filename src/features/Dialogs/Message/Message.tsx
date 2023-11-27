import React, { FC } from 'react'
import s from './Message.module.css'

type MessageType = {
    message: string
    id: string
}
const Message: FC<MessageType> = ({ id, message }) => {
    return (
        <div className={s.message} key={id}>
            {message}
        </div>
    )
}

export default Message
