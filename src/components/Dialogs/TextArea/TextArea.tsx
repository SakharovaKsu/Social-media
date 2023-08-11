import React, {ChangeEvent, FC, KeyboardEvent} from 'react';
import s from './TextArea.module.css'
import {AllActionType} from '../../../redux/state';
import {addMassageAC, updateNewMessageTextAC} from '../../../redux/dialogsReducer';
import Button from '../../Elements/Button';

type TextAreaType = {
    name: string
    addMessagesCallback: () => void
    updateNewMessageTextCallback: (text: string) => void
    newMessageText: string
}
const TextArea:FC<TextAreaType> = ({name,  newMessageText, addMessagesCallback, updateNewMessageTextCallback}) => {

    const addMessages = () => {
        addMessagesCallback()
    }

    const onMessageChange = (e:ChangeEvent<HTMLTextAreaElement>) => {
        // const text = newMessageElement.current?.value
        const text = e.currentTarget.value

        if(text) {
            updateNewMessageTextCallback(text)
        }
    }

    const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        const text = e.currentTarget.value

        if (e.key === 'Enter') {
            e.preventDefault()
            if (text.trim()) {
                addMessagesCallback()
            }
        }
    };

    return (
        <div className={s.wrapper}>
            <textarea className={s.textArea} placeholder={'Type your message'} value={newMessageText} onChange={onMessageChange} onKeyPress={handleKeyPress}></textarea>
            <Button color={'blue'} name={name} callback={addMessages}/>
        </div>
    );
};

export default TextArea;