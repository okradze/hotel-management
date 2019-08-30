import { reach } from 'yup'

function handleValidate(value, setValue, setErrors, path, schema) {
    try {
        setValue(values => ({
            ...values,
            [path]: value,
        }))
        reach(schema, path).validateSync(value)
        setErrors(errors => ({
            ...errors,
            [path]: '',
        }))
    } catch (e) {
        setErrors(errors => ({
            ...errors,
            [path]: e.message,
        }))
    }
}

export default handleValidate
