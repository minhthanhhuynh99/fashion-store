import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Slider.scss';

const Slider = () => {

    const [currentSlide, setCurrentSlide] = useState(0);

    const dataSlider = [
        {
            "image" : "https://img.freepik.com/free-photo/portrait-smiling-stylish-man-sunglasses-standing-against-brick-wall-modern-office_273443-3553.jpg?w=2000",
            "h4" : "Trade-in-offer",
            "h2" : "Super value deals",
            "h1" : "On all products",
            "p" : "Save more with coupons & up to 70% off!",
            "button" : "Shop Now"
        },
        {
            "image" : "https://selongkarstoriesdotcom.files.wordpress.com/2017/01/italian-men-fashion-sense-sunglasses-and-cup-of-coffee.jpg",
            "h4" : "Trade-in-offer",
            "h2" : "Super value deals",
            "h1" : "On all products",
            "p" : "Save more with coupons & up to 70% off!",
            "button" : "Shop Now"
        },
        {
            "image" : "https://images.hellomagazine.com/imagenes/fashion/news/20220601141439/mens-summer-fashion-outfit-ideas-to-shop/0-690-915/mens-style-edit-t.jpg",
            "h4" : "Trade-in-offer",
            "h2" : "Super value deals",
            "h1" : "On all products",
            "p" : "Save more with coupons & up to 70% off!",
            "button" : "Shop Now"
        },
        
    ]

    const prevSlide = () => {
        setCurrentSlide(currentSlide === 0 ? 2 : (prev) => prev - 1)
    }
    const nextSlide = () => {
        setCurrentSlide(currentSlide === 2 ? 0 : (prev) => prev + 1)
    }

    return (
        <div className='slider'>
            <div className='slider__container' style={{transform: `translateX(-${currentSlide * 100}vw`}}>
                {
                    dataSlider.map((item,index) => (
                        <>
                            <img className='slider__image' src={item.image} alt="" />
                            <section key={index} className="slider__content">
                                <h4>{item.h4}</h4>
                                <h2>{item.h2}</h2>
                                <h1>{item.h1}</h1>
                                <p>{item.p}</p>
                                <NavLink to="/shop">
                                    <button>{item.button}</button>
                                </NavLink>
                            </section>
                        </>
                    ))
                }
                
            </div>
            <div className='icons'>
                <div className='icon' onClick={prevSlide}>
                    <i class="ri-arrow-left-line"></i>
                </div>
                <div className='icon'  onClick={nextSlide}>
                    <i class="ri-arrow-right-line"></i>
                </div>
            </div>
        </div>
    );
};

export default Slider;