import React from 'react'

const Input = ({
    value,
    onChange,
    id,
    type,
    error,
    text,
    placeholder = '',
}) => (
    <div className="LoginForm__input-group">
        <label htmlFor="name">{text}</label>
        <input
            id={id}
            value={value}
            onChange={onChange}
            className="input"
            type={type}
            autoComplete="off"
            placeholder={placeholder}
        />
        {error && <p className="error SignupForm__error">{error}</p>}
    </div>
)

export default Input
