import React from 'react';
import { Container, Row, Col } from "reactstrap";
import Slider from 'react-slick';
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Grateful.scss';
import avatar1 from '../../../assets/images/avatar_1.webp';
import avatar2 from '../../../assets/images/avatar_2.webp';
const Grateful = () => {
    var settings = {
        autoplay: true,
        autoplaySpeed: 3000,
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };
    return (
        <div className='wrapper__container'>
            <Container>
                <Row>
                    <Col lg="12">
                        <div className='wrapper__title'>
                            <h1>HƠN 20,000 DOANH NGHIỆP, CÁ NHÂN ĐÃ CHỌN <br/> FASHION-SHOP</h1>
                            <p>Hãy nghe khách hàng đã sử dụng nói về chúng tôi</p>
                        </div>
                    </Col>
                </Row>
            </Container>
            <Container className='mt-5'>
                <Slider {...settings}>
                <Container className='wrapper__slider'>
                        <Row>
                            <Col lg="3" md='3'>
                                <div className='slider__item'>
                                    <span>
                                        Sau hơn 4 năm sử dụng Fashion-shop với 2 website,
                                        tôi thấy Fashion-shop hầu như đáp ứng được các yêu cầu của một cửa hàng vừa và nhỏ bán online cũng như giới thiệu sản phẩm.
                                        Hi vọng trong những năm tới, Fashion-shop sẽ có nhiều đổi mới và cập nhật nhiều tính năng tốt giúp việc bán hàng online qua website thuận tiện và đơn giản hơn. 
                                    </span>
                                    <hr />
                                    <p>ENGO</p>
                                    <span>CEO & Founder EngoCreative</span>
                                </div>
                                <div className='slider__avatar'>
                                    <img src={avatar1} alt="" />
                                </div>
                            </Col>
                            <Col lg="3" md='3'>
                                <div className='slider__item'>
                                    <span>
                                        Là đơn vị bán hàng online, 
                                        tôi rất hài lòng với giao diện của Fashion-shop, 
                                        Beemart thu hút được rất nhiều khách hàng. 
                                        Cảm ơn đội ngũ chăm sóc khách hàng tận tình và luôn tư vấn, 
                                        giới thiệu cho Beemart những tính năng mới, thuận tiện cho việc bán hàng online.
                                        Chúc Fashion-shop ngày càng phát triển và vươn xa hơn nữa. 
                                    </span>
                                    <hr />
                                    <p>BEEMART</p>
                                    <span>Project Manager</span>
                                </div>
                                <div className='slider__avatar'>
                                    <img src={avatar1} alt="" />
                                </div>   
                            </Col>
                            <Col lg="3" md='3'>
                                <div className='slider__item'>
                                    <span>
                                        Là khách hàng đang sử dụng dịch vụ của Fashion-shop,
                                        tôi hoàn toàn yên tâm và tin tưởng đội ngũ kỹ thuật,
                                        chăm sóc khách hàng luôn hỗ trợ khách hàng nhiệt tình, 
                                        giúp tôi yên tâm bán hàng và Handmadeinvietnam được nhiều khách hàng tin tưởng sử dụng. 
                                        Chúc cho Fashion-shop phát triển thành công hơn nữa trong thời gian tới. 
                                    </span>
                                    <hr />
                                    <p>HOÀNG THANH TÙNG</p>
                                    <span>- www.handmadeinvietnam.vn -</span>
                                </div>
                                <div className='slider__avatar'>
                                    <img src={avatar1} alt="" />
                                </div>    
                            </Col>
                            <Col lg="3" md='3'>
                                <div className='slider__item'>
                                    <span>
                                        Sử dụng dịch vụ của Fashion-shop đã được một thời gian khá dài, 
                                        gần đây nhất Megamart đã được nâng cấp lên phiên bản mới nhất của Fashion-shop vô cùng hiện đại, 
                                        đáp ứng được những yêu cầu khó tính của chúng tôi. Sau khi nâng cấp, 
                                        việc bán hàng của chúng tôi cũng phát triển mạnh hơn rất nhiều. Chúc cho Fashion-shop sẽ phát triển hơn nữa.
                                    </span>
                                    <hr />
                                    <p>TRẦN TIẾN THÀNH</p>
                                    <span>- www.megamart.vn -</span>
                                </div>
                                <div className='slider__avatar'>
                                    <img src={avatar1} alt="" />
                                </div>    
                            </Col>
                        </Row>
                </Container>
                <Container className='wrapper__slider'>
                        <Row>
                            <Col lg="3" md='3'>
                                <div className='slider__item'>
                                    <span>
                                        Sử dụng dịch vụ của Fashion-shop đã được một thời gian khá dài, 
                                        gần đây nhất Megamart đã được nâng cấp lên phiên bản mới nhất của Fashion-shop vô cùng hiện đại, 
                                        đáp ứng được những yêu cầu khó tính của chúng tôi. Sau khi nâng cấp, 
                                        việc bán hàng của chúng tôi cũng phát triển mạnh hơn rất nhiều. Chúc cho Fashion-shop sẽ phát triển hơn nữa.
                                    </span>
                                    <hr />
                                    <p>TRẦN TIẾN THÀNH</p>
                                    <span>- www.megamart.vn -</span>
                                </div>
                                <div className='slider__avatar'>
                                    <img src={avatar2} alt="" />
                                </div>     
                            </Col>
                            <Col lg="3" md='3'>
                                <div className='slider__item'>
                                    <span>
                                        Là khách hàng đang sử dụng dịch vụ của Fashion-shop,
                                        tôi hoàn toàn yên tâm và tin tưởng đội ngũ kỹ thuật,
                                        chăm sóc khách hàng luôn hỗ trợ khách hàng nhiệt tình, 
                                        giúp tôi yên tâm bán hàng và Handmadeinvietnam được nhiều khách hàng tin tưởng sử dụng. 
                                        Chúc cho Fashion-shop phát triển thành công hơn nữa trong thời gian tới. 
                                    </span>
                                    <hr />
                                    <p>HOÀNG THANH TÙNG</p>
                                    <span>- www.handmadeinvietnam.vn -</span>
                                </div>
                                <div className='slider__avatar'>
                                    <img src={avatar2} alt="" />
                                </div>    
                            </Col>
                            <Col lg="3" md='3'>
                                <div className='slider__item'>
                                    <span>
                                        Là đơn vị bán hàng online, 
                                        tôi rất hài lòng với giao diện của Fashion-shop, 
                                        Beemart thu hút được rất nhiều khách hàng. 
                                        Cảm ơn đội ngũ chăm sóc khách hàng tận tình và luôn tư vấn, 
                                        giới thiệu cho Beemart những tính năng mới, thuận tiện cho việc bán hàng online.
                                        Chúc Fashion-shop ngày càng phát triển và vươn xa hơn nữa. 
                                    </span>
                                    <hr />
                                    <p>BEEMART</p>
                                    <span>Project Manager</span>
                                </div>
                                <div className='slider__avatar'>
                                    <img src={avatar2} alt="" />
                                </div>   
                            </Col>
                            <Col lg="3" md='3'>
                                <div className='slider__item'>
                                    <span>
                                        Là một khách hàng đang sử dụng dịch vụ của Bizweb, 
                                        tôi thấy website của mình được các bạn nhân viên chăm sóc và hỗ trợ rất nhiệt tình 
                                        về việc quản trị website cũng như sử dụng các công cụ hỗ trợ quảng cáo 
                                        để quảng bá thêm cho website. Với chất lượng dịch vụ như vậy, 
                                        tôi vẫn sẽ luôn ở lại và đồng hành với Fashion-shop.
                                    </span>
                                    <hr />
                                    <p>LÊ CHÂU MINH</p>
                                    <span>Project Manager</span>
                                </div>
                                <div className='slider__avatar'>
                                    <img src={avatar2} alt="" />
                                </div>   
                            </Col>
                        </Row>
                </Container>
                </Slider>
            </Container>
        </div>
    );
};

export default Grateful;