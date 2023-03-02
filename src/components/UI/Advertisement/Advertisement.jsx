import React, { useState,useEffect } from 'react';
import {Container, Modal} from 'react-bootstrap';
import poster from '../../../assets/images/poster.jpg'
import './Advertisement.scss'

const Advertisement = () => {
    const [showAlert, setShowAlert] = useState(true);

    const setShow = () => {
        setShowAlert(false)
    }

    useEffect(()=>{
        const timer = setTimeout(()=>{
            setShowAlert(false)
        },2000)
        return () =>{clearTimeout(timer)}
    },[])
    return (
            <Modal show={showAlert} onHide={setShow} className="modal-alert ">
                <img src={poster} alt=""  />
                <i class="ri-close-line" onClick={setShow}></i>
            </Modal>
    );
};

export default Advertisement;