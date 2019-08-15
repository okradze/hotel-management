import { reach } from 'yup'

function handleValidate(value, setValue, path, setErrors, schema, errors) {
    try {
        setValue(value)
        reach(schema, path).validateSync(value)
        setErrors({
            ...errors,
            [path]: '',
        })
    } catch (e) {
        setErrors({
            ...errors,
            [path]: e.message,
        })
    }
}

export default handleValidate
