import React, { useEffect, useRef, useState } from 'react';
//import scss:
import './Service.scss';
import { SmoothHorizontalScrolling } from '../../../util/service';


const serviceData = [
    {
        "image": "https://i.pinimg.com/236x/84/b2/a8/84b2a8aef15a700336b9c70d4c40ec69.jpg",
        "sale" : "50%",
        "status" : "It's over",
        
    },
    {
        "image": "https://i.pinimg.com/736x/0c/44/bd/0c44bde9d0713a6439bea214f7c17635.jpg",
        "sale" : "20%",
        "status" : "Sold out",
        
    },
    {
        "image": "https://i.pinimg.com/736x/04/f7/c1/04f7c1dee9cb9d97cdd6dd7c3e59b48d.jpg",
        "sale" : "10%",
        "status" : "Sold 15 pieces",
        
    },
    {
        "image":  "https://i.pinimg.com/736x/d5/de/5b/d5de5be8cf9cb034cc29ff6f09d178f1.jpg",
        "sale" : "50%",
        "status" : "Stocking",
        
    },
    {
        "image":  "https://i.pinimg.com/736x/5a/d1/6a/5ad16a0407dff51f32f479066f3414a7.jpg",
        "sale" : "80%",
        "status" : "Stocking",
        
    },
    {
        "image":  "https://i.pinimg.com/564x/33/c6/6b/33c66bce0dca771f31afd1fe582b1f0f.jpg",
        "sale" : "20%",
        "status" : "Sold 20 pieces",
        
    },
    {
        "image":  "https://i.pinimg.com/736x/48/43/a3/4843a30d29733576da92c98556900b65.jpg",
        "sale" : "5%",
        "status" : "Stocking",
        
    },
    {
        "image":  "https://i.pinimg.com/originals/e3/36/b9/e336b938ca483a398db7f1177094ef37.jpg", 
        "sale" : "30%",
        "status" : "Sold out",
        
    },
    {
        "image":  "https://i.pinimg.com/736x/f5/4a/15/f54a157e344dd95904a1ddd88d2d1a5f.jpg", 
        "sale" : "20%",
        "status" : "Stocking",
        
    },
    {
        "image":  "https://i.pinimg.com/474x/a6/ce/a5/a6cea572719979f2503c60211f8fa226.jpg",
        "sale" : "50%",
        "status" : "Sold out",
        
    },
    {
        "image":  "https://i.pinimg.com/736x/fc/9a/b9/fc9ab988eca854015f3cd458ca75dfcd.jpg",
        "sale" : "100%",
        "status" : "Stocking",
        
    },
]

const Service = () => {
    const sliderRef = useRef();
    const imagesRef = useRef();
    const [dragDown, setDragDown] = useState(0);
    const [dragMove, setDragMove] = useState(0);
    const [isDrag, setIsDrag] = useState(false);


    const handleScrollRight = () => {
        const maxScrollLeft = sliderRef.current.scrollWidth - sliderRef.current.clientWidth
        if(sliderRef.current.scrollLeft < maxScrollLeft) {
            SmoothHorizontalScrolling(sliderRef.current, 
                250, 
                imagesRef.current.clientWidth * 2, 
                sliderRef.current.scrollLeft)
        }

    }
    const handleScrollLeft = () => {
        if(sliderRef.current.scrollLeft > 0) {
            SmoothHorizontalScrolling(sliderRef.current, 250 , -(imagesRef.current.clientWidth * 2), sliderRef.current.scrollLeft)
        };
    }

    useEffect(() => {
        if(isDrag) {
            if(dragMove < dragDown) handleScrollRight();
            if(dragMove > dragDown) handleScrollLeft();
        }
    }, [dragDown, dragMove, isDrag])

    const onDragStart = e => {
        setIsDrag(true);
        setDragDown(e.screenX);
    }

    const onDragEnd = e => {
        setIsDrag(false);
    }

    const onDragEnter = e => {
        setDragMove(e.screenX)
    }

    return <div className='service' draggable='false'>
        <div className='image__slider'
            ref={sliderRef} 
            draggable='true'
            onDragStart={onDragStart} 
            onDragEnd={onDragEnd}
            onDragEnter={onDragEnter}
        >
            {
                serviceData.map((images, index) => (
                    <div key={index} className='image__item' ref={imagesRef}>
                        <img src={images.image} alt="" />
                        <div className='image__sale'>
                            <span>{images.sale}</span>
                        </div>
                        <div className='image__status'>
                            <span>{images.status}</span>
                        </div>
                    </div>
                ))
            }
        </div>
        <div className='btn__left' onClick={handleScrollLeft}>
            <i class="ri-arrow-left-s-line"></i>
        </div>
        <div className='btn__right' onClick={handleScrollRight}>
            <i class="ri-arrow-right-s-line"></i>
        </div>
    </div>
};

export default Service;