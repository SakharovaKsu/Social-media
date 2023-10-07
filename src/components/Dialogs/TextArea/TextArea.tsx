import React, {ChangeEvent, FC, KeyboardEvent} from 'react';
import s from './TextArea.module.css'
import Button from '../../Elements/Button/Button';
import {useFormik} from 'formik';
import {validateMessage} from '../../../utils/validate';

type TextAreaType = {
    name: string
    addMessagesCallback: () => void
    updateNewMessageTextCallback: (text: string) => void
}

export type FormValuesType = {
    message: string
}

const MAX_MESSAGE_LENGTH = 3

const TextArea:FC<TextAreaType> = ({name, addMessagesCallback, updateNewMessageTextCallback}) => {

    const formik = useFormik({
        initialValues: {
            message: '',
        } as FormValuesType,
        validate: (values) => {
            let errors = {message: ''}
            if (!values.message.trim()) {
                errors.message = 'Message cannot be empty'
            } else if (values.message.length > MAX_MESSAGE_LENGTH) {
                errors.message = `Message cannot be longer than ${MAX_MESSAGE_LENGTH} characters`
            }
            return errors
            // validateMessage(5, values.message)
        },
        onSubmit: values => {
            updateNewMessageTextCallback(values.message)
            addMessagesCallback()

            // очищаем форму после отправки
            formik.resetForm()
        },
    })

    const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            formik.handleSubmit();
        }
    }

    return (
        <form className={s.wrapper} onSubmit={formik.handleSubmit}>
            <textarea className={s.textArea}
                      placeholder={'Type your message'}
                      onKeyPress={handleKeyPress}
                      {...formik.getFieldProps('message')}>
            </textarea>
            {formik.touched.message && formik.errors.message && <span className={s.error}>{formik.errors.message}</span>}
            <Button color={'blue'} name={name} type='submit'/>
        </form>
    );
};

export default TextArea;