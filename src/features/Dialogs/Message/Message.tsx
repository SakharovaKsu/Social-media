import React, { FC } from 'react'
import s from './Message.module.css'

type MessageType = {
    message: string
    id: string
    color?: string
}
const Message: FC<MessageType> = ({ id, message, color }) => {
    const style = s.message + ' ' + (color === 'contrasting' ? s.messageContrasting : s.messageLight)

    return (
        <div className={style} key={id}>
            {message}
        </div>
    )
}

export default Message
