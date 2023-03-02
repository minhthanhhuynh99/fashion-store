import React from 'react';
import Header from '../../layout/Header';
import Footer from '../../layout/Footer';
import Intro from '../../components/UI/Intro/Intro';
import Grateful from '../../components/UI/Grateful/Grateful';
import Sup from '../../components/UI/Support/Sup';
import { Container, Row, Col } from 'reactstrap';
import contactImg  from '../../assets/images/contact.webp';
import BtnScrollToTop from '../../components/common/ButtonScroll/BtnScrollToTop';

const Review = () => {
    const top = () => {
        window.scrollTo(0, 0)
    }
    top()
    return (
        <div>
            <Header/>
            <Intro/>
            <Container className='mt-5'>
                <Row>
                    <Col lg='4' md='12'>
                        <h3>Review</h3>
                        <br />
                        <div className='mb-4'>Chúng tôi chuyên kinh doanh sỉ và lẻ các mặt hàng thời trang nam trên Toàn Quốc với giá cả và chất lượng cạnh tranh nhất.
                            Chỉ với một cú click chuột hoặc một cuộc điện thoại, 
                            bạn có thể sở hữu ngay sản phẩm của chúng tôi mà không cần đến tận nơi để mua sắm trong cuộc sống bận rộn hiện nay.
                        </div>
                        <div className='mb-4'>Đến với Thời Trang Phái Mạnh , các bạn có thể dễ dàng lựa chọn cho mình những mặt hàng thời trang được yêu thích nhất hiện nay cho giới trẻ như :
                             Quần Kaki –  Quần Jean , Skinny – Áo sơ mi – Áo Thun body – Và hàng trăm phụ kiện cần thiết khác cho cuộc sống …..
                            Shop  thuờng xuyên nhập những mẫu hàng hot nhất trên thị trường và có những hàng xách tay đặc biệt không đụng hàng.             
                        </div>
                        <div className='mb-4'>Phong cách phục vụ khách hàng thân thiện, 
                            tư vấn chu đáo, sản phẩm phù hợp túi tiền và 
                            bảo hành hậu mãi cho sản phẩm tận tâm chính là tiêu chí hàng đầu mà Thời Trang Phái Mạnh luôn đặt ra
                             nhằm đem lại sự hài lòng cho Quý khách hàng.      
                        </div>
                    </Col>
                    <Col lg='8' md='12' >
                        <img src={contactImg} alt=""  className='mt-3'/>
                    </Col>
                </Row>
            </Container>

            <Grateful/>
            <Sup/>
            <Footer/>
            <BtnScrollToTop/>
        </div>
    );
};

export default Review;