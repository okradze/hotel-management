import React from 'react'

const Input = ({ onChange, text, error, ...otherProps }) => (
    <div className="LoginForm__input-group">
        <label htmlFor="name">{text}</label>
        <input onChange={onChange} className="input" {...otherProps} />
        {error && <p className="error SignupForm__error">{error}</p>}
    </div>
)

export default Input
