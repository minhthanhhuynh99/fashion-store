import React, { useState, useEffect, useRef } from 'react';
import Footer from '../../layout/Footer';
import Header from '../../layout/Header';
import map from '../../assets/images/map.png';
import BtnScrollToTop from '../../components/common/ButtonScroll/BtnScrollToTop';
import './Contact.scss';
import emailjs from '@emailjs/browser'; 
import { toast } from 'react-toastify';

const Contact = () => {
    const top = () => {
        window.scrollTo(0, 0)
      }
    top()

    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm("service_5d0ir0j" , "template_ccfd69i", e.target, "1G-ekzjEF4BuBFKbc")
        .then((result) => {
            toast.success("Cảm ơn bạn đã gửi Mail cho chúng tôi! :)");
        },(error) => {
            toast.warning(error.message)
        }
        )
        e.target.reset();
    }
   

    return (
        <div>
            <Header/>
            <section className='contact__section'>
                <div className='container'>
                    <div className='row justify-content-center'>
                        <div className='col-md-10'>
                            <div className='wrapper'>
                                <div className="row no-gutters">
                                    <div className="col-md-6">
                                        <div className="contact-wrap w-100 p-lg-5 p-4">
                                            <h3 className='mb-4'>Send us a message</h3>
                                            <form ref={form} onSubmit={sendEmail}>
                                                <div className='row'>
                                                    <div className="col-md-12">
                                                        <div className='form-group'>
                                                            <input type="text" 
                                                                className='form-control'
                                                                name='name'
                                                                placeholder='fullName'
                                                               
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className='form-group'>
                                                            <input type="email" 
                                                                className='form-control'
                                                                name='email'
                                                                placeholder='Email'

                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className='form-group'>
                                                            <input type="text" 
                                                                className='form-control'
                                                                name='message'
                                                                placeholder='Subject'
                                                             
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className='form-group'>
                                                            <textarea type="text" 
                                                                className='form-control'
                                                                name='subject'
                                                                placeholder='content'
                                                                cols="30"
                                                                rows="3"
                                                              
                                                            ></textarea>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className='form-group'>
                                                            <input type="submit" value="Send Message" className='btn btn-primary'/>
                                                        </div>
                                                    </div>  
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <div className="col-md-6 d-flex align-items-stretch">
                                        <div className="info-wrap w-100 p-lg-5 p-4 img">
                                            <h3 className='mb-3'>Contact us</h3>
                                            <p className='mb-4'>We're open for any suggestion or just to have a chat</p>
                                            <div className="dbox w-100 d-flex align-items-start">
                                                <div className="icon d-flex align-items-center justify-content-center">
                                                    <span className='fa fa-map-marker'></span>
                                                </div>
                                                <div className="text pl-3 mt-3">
                                                    <p>
                                                        <span>Address:</span> 122 Phan Thanh, TP.Đà Nẵng
                                                    </p>
                                                </div>
                                            </div>    
                                            <div className="dbox w-100 d-flex align-items-start">
                                                <div className="icon d-flex align-items-center justify-content-center">
                                                    <span className='fa fa-phone'></span>
                                                </div>
                                                <div className="text pl-3 mt-3">
                                                    <p>
                                                        <span>Phone:</span> 0932445772
                                                    </p>
                                                </div>
                                            </div>   
                                            <div className="dbox w-100 d-flex align-items-start">
                                                <div className="icon d-flex align-items-center justify-content-center">
                                                    <span className='fa fa-paper-plane'></span>
                                                </div>
                                                <div className="text pl-3 mt-3">
                                                    <p>
                                                        <span>Email:</span>
                                                        <a href="#"> thanhminh99@gmail.com</a> 
                                                    </p>
                                                </div>
                                            </div>     
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> 
                    </div>
                </div>
            </section>
            <section className='container'>
                <div className='container container__map '>
                        <a
                            className="map__card__link"
                            href="https://www.google.com/maps/place/122+Phan+Thanh,+Th%E1%BA%A1c+Gi%C3%A1n,+Thanh+Kh%C3%AA,+%C4%90%C3%A0+N%E1%BA%B5ng+550000,+Vi%E1%BB%87t+Nam/@16.0616305,108.20687,17z/data=!3m1!4b1!4m5!3m4!1s0x314219b465977c15:0x3dad2e6942b72763!8m2!3d16.0616305!4d108.2090587?hl=vi-VN"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Open in google map <i class="ri-arrow-right-fill"></i>
                        </a>
                </div>
            </section>
            <div className='map__image'>
                <img src={map} alt="" />
            </div>
            <Footer/>
            <BtnScrollToTop/>
        </div>
    );
};


// const renderAlert = () => (
//     <div>
//       {
//         toast.success("Your content submitted successfully!")
//       }
//     </div>
// );
export default Contact;