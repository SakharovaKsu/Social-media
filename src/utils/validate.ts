import {FormValuesType} from '../components/Dialogs/TextArea/TextArea';

export const validateMessage = (length: number, values: string) => {
    let errors: Partial<FormValuesType> = {message: ''};
    if (!values.trim()) {
        return errors.message = 'Message cannot be empty';
    } else if (values.length > length) {
        return errors.message = `Message cannot be longer than ${length} characters`;
    }
    return errors.message
}