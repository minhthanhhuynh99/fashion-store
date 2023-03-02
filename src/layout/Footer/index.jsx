import React from 'react';
import './index.scss';
import { Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import app from "../../assets/images/app.jpg";
import play from "../../assets/images/play.jpg";
import pay from "../../assets/images/pay.png";

function Footer(props) {

  const year = new Date().getFullYear()

  return <footer className='footer' data-aos='fade-up' data-aos-duration='1800'>
      <Container>
        <Row>
          <Col lg='4'>
            <div className='logo'>
              <div>
                <h1><Link to='/' className='text-black'>Fashion Shop</Link></h1>
              </div>
            </div>
            <div className="footer__quick-links">
              <h4 className='quick__links-title '>Contact</h4>
              <ListGroup className='footer__contact mb-3'>
                <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-2'>
                  <span><i className="ri-map-pin-line"></i></span>
                  <p>122, Phan Thanh, TP.Đà Nẵng</p>
                </ListGroupItem>

                <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-2'>
                  <span><i className="ri-phone-line"></i></span>
                  <p>0932456789</p>
                </ListGroupItem>

                <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-2'>
                  <span><i className="ri-mail-line"></i></span>
                  <p>huynhminhthanh@gmail.com</p>
                </ListGroupItem>
              </ListGroup>
            </div>
            <div className='icon__footer'>
              <h4 className='quick__links-title'>Follow us</h4>
                <i className='fab fa-facebook-f'></i>
                <i className='fab fa-twitter'></i>
                <i className='fab fa-instagram'></i>
                <i className='fab fa-pinterest-p'></i>
                <i className='fab fa-youtube  '></i>
            </div>
          </Col>
          <Col lg='3'>
            <div className="footer__quick-links">
              <h4 className='quick__links-title '>Top Categories</h4>
              <ListGroup className='mb-3'>
                <ListGroupItem className='ps-0 border-0'>
                  <Link to='#'>Mobile Phones</Link>
                </ListGroupItem>

                <ListGroupItem className='ps-0 border-0'>
                  <Link to='#'>Modern Shirt</Link>
                </ListGroupItem>

                <ListGroupItem className='ps-0 border-0'>
                  <Link to='#'>Arm Shirt</Link>
                </ListGroupItem>

                <ListGroupItem className='ps-0 border-0'>
                  <Link to='#'>Mobile Phones</Link>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>
          <Col lg='2'>
            <div className="footer__quick-links">
              <h4 className='quick__links-title '>Full Links</h4>
              <ListGroup className='mb-3'>
                <ListGroupItem className='ps-0 border-0'>
                  <Link to='/shop'>Shop</Link>
                </ListGroupItem>

                <ListGroupItem className='ps-0 border-0'>
                  <Link to='/cart'>Cart</Link>
                </ListGroupItem>

                <ListGroupItem className='ps-0 border-0'>
                  <Link to='/login'>Login</Link>
                </ListGroupItem>

                <ListGroupItem className='ps-0 border-0'>
                  <Link to='#'>Privacy Policy</Link>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>
          <Col lg='3'>
            <div className='install'>
                <h4 className='quick__links-title'>Install App</h4>
                <p>From App Store or Google Play</p>
                <div className='install__img'>
                     <img src={app} alt="" />
                     <img src={play} alt="" />
                </div>
                <p>Secured Payment Gateways</p>
                <img src={pay} alt="" />
            </div>
          </Col>

          <Col lg='12'>
            <p className='footer__copyright'>Copyright {year} </p>
          </Col>
        </Row>
      </Container>
  </footer>
}


export default Footer
