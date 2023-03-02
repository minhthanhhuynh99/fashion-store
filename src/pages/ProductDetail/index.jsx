import React, { useState, useEffect } from 'react';
import ReactImageMagnify from 'react-image-magnify';
import './index.scss';
import Footer from '../../layout/Footer';
import Header from '../../layout/Header';
import {motion} from 'framer-motion';
import { Container, Row, Col } from 'reactstrap';
import { useParams, useNavigate, Link, NavLink } from 'react-router-dom';
import CommonSection from '../../components/UI/CommonSection/CommonSection';
import { useDispatch, useSelector } from 'react-redux';
import { useListSelectorProducts } from '../../redux/selectors';
import { fetchProducts } from '../../redux/Silice/ProductsSlice';
import { fetchUsers } from '../../redux/Silice/UsersSlice';
import { toast } from 'react-toastify';
import Loading from '../../util/loading/Loading';
import { addNewOder } from '../../redux/Silice/ordersSlice';
import { fetchCartOder } from '../../redux/Silice/ordersSlice';
import axiosClient from '../../apis/axiosClient';




const ProductDetail = () => {

    const top = () => {
        window.scrollTo(0, 0)
      }
      top()
    const users = useSelector(state=>state.userList.users)
    const cartOder = useSelector(state=>state.orderList.cartOder)


    const [cartOfUser,setCartOfUser] = useState([])

    const dispatch  =useDispatch()
    
    const [isLogin, setIsLogin] = useState(() => {
        const save = localStorage.getItem('userLogin') ? JSON.parse(localStorage.getItem('userLogin')) : [];
        return save;
      });

      console.log(isLogin)

    const userCartOder = users.find(item => item.email === isLogin.email) 
    console.log(userCartOder)


    useEffect(() => {
        dispatch(fetchUsers())
        dispatch(fetchCartOder())
    },[])

    const params = useParams()
    console.log(params, "params")
    const prdId = params.id
    const productsList = useSelector(useListSelectorProducts);
    const [detailProduct, setDetailProduct] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(8);
    const navigate = useNavigate()
    
    useEffect(()=>{
      const fetchCartUser = async () =>{
        const res = await axiosClient.get(`users/${userCartOder.id}?_embed=cartOder`)
        setCartOfUser(res.data.cartOder)
      }
      fetchCartUser()
    },[])
    const idExist =  cartOfUser? cartOfUser.find(item=>item.productId===detailProduct.id):undefined
    
    // pagination
    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPost =  productsList.slice(firstPostIndex, lastPostIndex)

    // add to cart
    const handleAddToCart = () =>{
        if(isLogin.length===0){
            toast.error('Bạn cần phải đăng nhập để mua hàng');
        } else{
            if(!idExist) {
                toast.success("Bạn đã thêm một sản phẩm vào giỏ hàng")
                dispatch(addNewOder({
                    userId: userCartOder.id,
                    productId: prdId,
                    quantity : 1
                }))
            }else {
               toast.warning('Sản phẩm bạn chọn đã có trong giỏ hàng')
            }
        }
    }

    useEffect(() => {
        dispatch(fetchProducts())
        if(params) {
            productsList.forEach(product => {
                if(product.id === params.id) setDetailProduct(product)
            })
        }
    }, [params])
    if(detailProduct === 0 ) return null;
    return (
        <div>
            <Header />
            <CommonSection/>

            {detailProduct.length === 0 && <Loading/>}
            <section className='container product__detail_container'>
                <div className='single__pro_image'>
                    <div className='product__image'>
                        <ReactImageMagnify {...{
                            smallImage: {
                                alt: 'Wristwatch by Ted Baker London',
                                isFluidWidth: true,
                                src: detailProduct.image,
                            },
                            largeImage: {
                                src: detailProduct.image,
                                width: 800,
                                height: 1100
                            }
                        }} />
                    </div>
                </div>
                <div className='single__product__detail'>
                        <h2>{detailProduct.name}</h2>
                        <div className='product__rating'>
                            <div>
                                <span><i className="ri-star-s-fill"></i></span>
                                <span><i className="ri-star-s-fill"></i></span>
                                <span><i className="ri-star-s-fill"></i></span>
                                <span><i className="ri-star-s-fill"></i></span>
                                <span><i className="ri-star-half-line"></i></span>
                            </div>
                        </div>
                        <span className='product__price'><p>Price:</p> ${detailProduct.price}</span>
                        <p className='mt-3'>Size: {detailProduct.size}</p>
                        <p className='mt-3'>PRODUCT CODE: {detailProduct.id}</p>
                        <p className='mt-3'>Availability {detailProduct.inStock}</p>
                        <p className='mt-3'>Description: {detailProduct.description}</p>
                        <br />
                        <motion.button whileTap={{scale: 1.2}} className='buy__btn addBtn' onClick={handleAddToCart}>Add to Cart</motion.button>
                </div>
            </section>
            
            <Container>
                {currentPost.length === 0 && <Loading/>}
                <Row>
                    <h4 className='title_pro_detail'>Alliance Products <i class="ri-arrow-down-s-fill"></i></h4>
                    {
                        currentPost.map((item) => (
                            <Col lg='3' md='4' className='mb-3'>
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
                    ))
                    }
                </Row>
                
                </Container>  
                <div className='container_shop'>
                    <NavLink to="/shop" >
                        <p className='shop-page'>Tất cả sản phẩm...</p>
                    </NavLink>
                </div>  
            <Footer/>
        </div>
    );
};

export default ProductDetail;