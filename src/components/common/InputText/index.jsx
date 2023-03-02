import React from 'react';
function InputText({name,type,value,id,placeholder,onChange,onClick,list,disabled,className}) {
    return (
        <>
            <input type={type} list={list} value={value} name={name} id={id} placeholder={placeholder} onChange={onChange} className={className} onClick={onClick} disabled={disabled}/>
        </>
    );
}

export default InputText;