import React from 'react';
import {motion} from 'framer-motion';
import './ProductCart.scss';
import {Col} from 'reactstrap'; 
import { Link , useNavigate} from 'react-router-dom';

const ProductCart = ({item}) => {

    const navigate = useNavigate()


    return (
        <Col lg='3' md='4' className='mb-2'>
           <div className='product-field'>
               <ul className='product-items'>
                <li className='product-li'>
                        <picture>
                            <img src={item.image} alt="" />
                        </picture>
                        <div className='detail'>
                            <p className='detail-icon'>
                                <span><i className='far fa-heart'></i></span>
                                <span><i className='far fa-share-square'></i></span>
                                <span><Link to={`/shop/${item.id}`}><i className='fas fa-shopping-basket'></i></Link></span>
                            </p>
                            <strong>{item.size}</strong>
                            <span>{item.name}</span>
                           <div className='detail-nav'>
                                <small><Link to={`/shop/${item.id}`}><i class="ri-arrow-right-circle-fill"></i></Link> </small>
                           </div>
                        </div>
                        <h4>${item.price}</h4>
                    </li>
               </ul>
           </div>
        </Col>
    );
};

export default ProductCart;

