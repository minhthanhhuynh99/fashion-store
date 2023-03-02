import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import './Sup.scss'
import sup1 from '../../../assets/images/sup1.webp';
import sup2 from '../../../assets/images/sup2.webp';
import sup3 from '../../../assets/images/sup3.webp';
import { motion } from 'framer-motion';


const Sup = () => {
    return (
        <Container className='mb-5'>
            <Row>
                <Col lg='4' md='4'>
                    <div className='sup_content '>
                        <motion.img whileHover={{scale: 1.2}} src={sup1} alt="" />
                        <h3>MIỄN PHÍ VẬN CHUYỂN</h3>
                    </div>
                </Col>
                <Col lg='4' md='4'>
                    <div className='sup_content '>
                        <motion.img whileHover={{scale: 1.2}} src={sup2} alt="" />
                        <h3>HỖ TRỢ KHÁCH HÀNG 24/7</h3>
                    </div>
                </Col>
                <Col lg='4' md='4'>
                    <div className='sup_content'>
                        <motion.img whileHover={{scale: 1.2}} src={sup3} alt="" />
                        <h3>HOÀN TIỀN 100%</h3>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Sup;