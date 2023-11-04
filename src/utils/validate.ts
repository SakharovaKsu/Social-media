export const validateMessage = (length: number, values: string) => {
    let errors: any = {}
    if (!values.trim()) {
        return (errors.message = 'Message cannot be empty')
    } else if (values.length < length) {
        return (errors.message = `Message cannot be longer than ${length} characters`)
    }
    return errors.message
}
