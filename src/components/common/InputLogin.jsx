import React, { useId } from 'react';

const InputLogin = ({label, placeholder, type = "text" , onChange}) => {
    const id = useId()

    return (
        <div className='input-wrap'>
            <input 
                id='loginEmail'
                placeholder={placeholder}
                type={type}
                onChange={onChange}
            /> 
            <label htmlFor={id} className='label'>{label}</label>
        </div>
    );
};

export default InputLogin;