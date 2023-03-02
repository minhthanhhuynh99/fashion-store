import React from 'react';
import { Container,Row,Col,Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import './ThankYou.scss';
import Header from '../../layout/Header';
import Footer from '../../layout/Footer';
const ThankYou = () => {
    const top = () => {
        window.scrollTo(0, 0)
      }
    top();
    return (
        <>
        <Header/>
        <section>
            <Container>
                <Row>
                    <Col lg="12" className='pt-5 text-center'>
                        <div className="thank__you">
                            <span><i className='ri-checkbox-circle-line'></i></span>
                            <h1 className="mb-3 fw-semibold">Thank You</h1>
                            <h3 className='mb-4'>You have successfully placed your order!</h3>

                            <Button className='btn-thank-you'><Link to="/">Back To Home</Link></Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
        <Footer/>
        </>
    );
};

export default ThankYou;