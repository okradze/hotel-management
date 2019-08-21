import { reach } from 'yup'

export default function validateField(schema, path, value) {
    return reach(schema, path).validateSync(value)
}
