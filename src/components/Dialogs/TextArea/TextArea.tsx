import React from 'react';
import s from './TextArea.module.css'

const TextArea = (props: any) => {
    return (
        <div className={s.wrapper}>
            <textarea className={s.textArea} placeholder="Type your message"></textarea>
            <button className={s.button}>{props.name}</button>
        </div>
    );
};

export default TextArea;