import React , {useEffect, useState} from 'react';
import { Link , useNavigate} from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import {motion} from 'framer-motion';
import './index.scss';
import img from '../../assets/images/slider6.webp';
import Clock from '../../components/UI/Clock/Clock';
//import slider:
import Slider from '../../components/common/Slider/Slider';
import Service from '../../components/common/Service/Service';
import ProductList from '../../components/UI/ProductList/ProductList';
import Grateful from '../../components/UI/Grateful/Grateful';
import Sup from '../../components/UI/Support/Sup';
//import btnScroll:
import BtnScrollToTop from '../../components/common/ButtonScroll/BtnScrollToTop';
import { useDispatch, useSelector } from 'react-redux';
import { useListSelectorProducts } from '../../redux/selectors';
import { fetchProducts } from '../../redux/Silice/ProductsSlice';

function Content(props) {

  const top = () => {
    window.scrollTo(0, 0)
  }
  top()

  const productsList = useSelector(useListSelectorProducts);
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(fetchProducts())
  }, [dispatch])

  const navigate = useNavigate()
  

  return (
    <div>
      <Slider/>

      <h2 className='title__service mt-5 mb-5 text-center' >Feature Products</h2>
      <Service/>

      <section className='trending__products mt-5' data-aos='fade-up'  data-aos-duration='1800' >
          <Container>
            <Row>
              <Col lg='12' className='mb-5' >
                  <h2 className='title__service'>Trending Products</h2>
              </Col>
              <Col lg='12' className='mb-5' >
                  <ProductList/>
                  <p onClick={() => navigate('/shop')}>All products...</p>
              </Col>
              
            </Row>
          </Container>
      </section>

      <section className='timer__count' data-aos='fade-up' data-aos-delay='300' data-aos-duration='1800'>
        <Container>
          <Row>
            <Col lg='6' md='12'>
              <div className='clock__top-content'>
                <h4 data-aos='fade-right' data-aos-delay='300' data-aos-duration='1800' className='fs-6 mb-2'>Limited Offers</h4>
                <h3 data-aos='fade-left' data-aos-delay='300' data-aos-duration='1800' className='fs-5 mb-2'>Quality Armchair</h3>
              </div>
              <Clock/>
              <motion.button whileHover={{scale: 1.1}} className='buy__btn store__btn' data-aos='zoom-in' data-aos-delay='200' data-aos-duration='1800'>
                <Link to='/shop'>Visit Store</Link>
              </motion.button>
            </Col>
            <Col lg='6' md='12' className='text-end counter__img' data-aos='zoom-in' data-aos-delay='300' data-aos-duration='1800'>
              <img src={img} alt="" />
            </Col>
          </Row>
        </Container>
      </section>

      <section className='new__products' data-aos='fade-up' data-aos-duration='1500'>
          <Container>
            <Row>
              <Col lg='12' className='mt-4'>
                  <h2 className='title__service mb-4'>New Arrivals</h2>
              </Col>
              <Col lg='12' >
                  <ProductList/>
                  <p onClick={() => navigate('/shop')}>All products...</p>
              </Col>
            </Row>
          </Container>
      </section>

      <section className='popular__products' data-aos='fade-up' data-aos-duration='1500'>
          <Container>
            <Row>
              <Col lg='12' >
                  <h2 className='title__service mb-4'>Popular in Category</h2>
              </Col>
              <Col lg='12' >
                  <ProductList/>
                  <p className='text-center' onClick={() => navigate('/shop')}>All products...</p>
              </Col>
            </Row>
          </Container>
      </section>

      <Grateful/>

      <Sup/>


      <BtnScrollToTop/>
    </div>
  )
}

export default Content
