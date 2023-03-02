import React, { useEffect, useState } from 'react';
import './index.scss';

const BtnScrollToTop = () => {

    const top = () => {
        window.scrollTo(0, 0)
    }

    const [showGoToTop, setGoShowToTop] = useState(false);


    useEffect (() => {

        const handleScroll = () => {
            if(window.scrollY >= 2000) {
                setGoShowToTop(true)
            }else{
                setGoShowToTop(false)
            }
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener("scroll", handleScroll)
        }

    })
    return (
        <>
            {showGoToTop && (
                <div className='container__btn' onClick={top}>
                    <div className='TopBtn'><i class="ri-arrow-up-line"></i></div>
                </div>
            )}
        </>
    )
};

export default BtnScrollToTop;