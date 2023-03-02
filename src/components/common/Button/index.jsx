import React from 'react';
function Button({nameBtn,OnClick,className,iconBtn,key}) {
    return (
        <>
        <button
        key={key}
        className ={className}
        onClick={OnClick}
        >
            {iconBtn}
            {nameBtn}
        </button>
        </>
    );
}
export default Button;