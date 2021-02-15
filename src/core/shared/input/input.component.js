import React from 'react'

const Input = ({ onChange, placeholder, customClass, ...props }) => {
    return (
        <input {...props} onChange={onChange} className={`form-control ${customClass}`} type='text' placeholder={placeholder || 'Enter a text'} />
    )
}

export default Input
