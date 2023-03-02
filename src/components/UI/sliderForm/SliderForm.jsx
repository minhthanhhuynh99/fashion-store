import React, { useState } from 'react';
import {FaArrowAltCircleRight, FaArrowAltCircleLeft} from "react-icons/fa";
import './SliderForm.scss'
import { sliderData } from '../../../data/slideData';
const SliderForm = ({ sliders }) => {
    
    const [current, setCurrent] = useState(0);
    const length = sliders.length;
   

    const nextSlider = () => {
        setCurrent(current === length - 1 ? 0 : current + 1)
    }
    const prevSlider = () => {
        setCurrent(current === 0 ? length - 1 : current - 1)
    }

    console.log(current)
    if(!Array.isArray(sliders) || sliders.length <=0){
        return null
    }

    return (
        <section className='slider-Form'>
            <FaArrowAltCircleLeft className='left-arrow' onClick={prevSlider}/>
            <FaArrowAltCircleRight className='right-arrow' onClick={nextSlider}/>
            {
                sliderData.map((slider,index) => {
                    return (
                        <div className={index === current ? "slide active" : "slide"} key={index}>
                            {index === current && (<img className='imageForm' src={slider.image} alt="fashion image"/>)}
                        </div>
                    )
                })
            }
        </section>
    );
};

export default SliderForm;