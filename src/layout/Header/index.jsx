import React , { useRef, useEffect, useState } from 'react';
//import thu vien 
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Container,Row } from 'reactstrap';
import { motion } from 'framer-motion';
import './index.scss';
import { toast } from 'react-toastify';
//import image:
import user from '../../assets/images/user.png';
import logo from '../../assets/images/logo-store.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../redux/Silice/UsersSlice';
import axiosClient from '../../apis/axiosClient';
import { fetchCartOder } from '../../redux/Silice/ordersSlice';


const Header = (props) => {
    const [cart, setCart] = useState([]);
    const cartOrder = useSelector(state=>state.orderList.cartOder)
    const userCartOder = useSelector(state => state.userList.users) 
    const products = useSelector(state => state.productList.products)
    const render  = useSelector(state=>state.countList.count);
    const dispatch  =useDispatch()
    
    const [isLogin, setIsLogin] = useState(() => {
        const save = localStorage.getItem('userLogin') ? JSON.parse(localStorage.getItem('userLogin')) : [];
        return save;
    });
    const userCartOderLogin = userCartOder.find(item => item.email === isLogin.email) 
    let isUser;
    userCartOderLogin?isUser =userCartOderLogin:isUser=[]

    useEffect(() => {
        dispatch(fetchUsers())
        dispatch(fetchCartOder())
    },[])
    const [avatar,setAvatar] = useState()
    useEffect(() => {
        const featchCart = async () => {
            const res =await axiosClient.get(`users/${isUser.id}?_embed=cartOder`);
              setCart(res.data.cartOder)
              setAvatar(res.data)
            return res.data.cartOder
        }
        featchCart()
    },[isUser,cartOrder,render])

   const mapCart = cart.map((a)=>{
    return a.productId
   })

    const cartOrdersList = products.filter(function(value) {
        return this.has(value.id)
       },new Set(mapCart))

    const headerRef = useRef(null);

    const menuRef = useRef(null);

    const navigate = useNavigate();

    const profileActionRef = useRef(null) ;

    const cartMessage = useRef(null);

    const stickyHeaderFunc = () => {
        window.addEventListener('scroll', () => {
           if (document.body.scrollTop > 80 || document.documentElement.scrollTop 
            > 80){
                headerRef.current.classList.add('sticky__header')
            }else {
                headerRef.current.classList.remove('sticky__header')
            }
        })
    }

    useEffect(() => {
        
        stickyHeaderFunc()

        return () => window.removeEventListener('scroll', stickyHeaderFunc)
    }, []);

    const menuToggle = () => menuRef.current.classList.toggle('active__menu')

    const navigateToCart = () => {
        navigate('/cart'); 
    }

    const toggleProfile = () => profileActionRef.current.classList.toggle('show__profile');

    const toggleCartMessage = () => cartMessage.current.classList.toggle('show__nav__icons-children');


    //user Login
    let currentUserLogin= false

    const checkUserLogin = JSON.parse(localStorage.getItem("userLogin"))
    checkUserLogin ? currentUserLogin = true : currentUserLogin = false
  

    const handleLogoutUser = () => {
        localStorage.removeItem("userLogin");
        localStorage.removeItem("orderUser");
    }

    const [cartPrd,setCartPrd] = useState("")
    useEffect(()=>{
    const fetchCart = async ()=>{
        const res = await axiosClient.get(`cartOder?_expand=product`)
        setCartPrd(res.data)
    }
    fetchCart()
    },[cartOrder])

    const cartMessList = cartPrd?cartPrd.filter(item=> item.userId === isUser.id ) :[]

    
   

    return <header className='header' ref={headerRef}>
        <Container>
            <Row>
                <div className='nav__wrapper'>
                    <div className='logo'>
                        <div className='d-flex'>
                            <img src={logo} alt="" />
                            <h1><Link to='/' className='title'>Fashion Shop</Link></h1>
                        </div>
                    </div>
                   <div className='navigation' ref={menuRef}  onClick={menuToggle}>
                        <ul className='menu'>
                            {
                                currentUserLogin ? 
                                <>
                                    <li className='nav__item'>
                                                <NavLink to='/'>HOME</NavLink>
                                            </li>
                                            <li className='nav__item'>
                                                <NavLink to='/shop'>PRODUCTS</NavLink>
                                            </li>
                                            <li className='nav__item' >
                                                <NavLink to='/review'>ABOUT US</NavLink>
                                            </li>
                                            <li className='nav__item' >
                                                <NavLink to='/contact'>CONTACT US</NavLink>
                                            </li>    
                                </> : <>
                                <li className='nav__item'>
                                                <NavLink to='/'>HOME</NavLink>
                                            </li>
                                            <li className='nav__item' >
                                                <NavLink to='/shop'>PRODUCTS</NavLink>
                                            </li>
                                            <li className='nav__item'>
                                                <NavLink to='/review'>ABOUT US</NavLink>
                                            </li>
                                            <li className='nav__item' >
                                                <NavLink to='/contact'>CONTACT US</NavLink>
                                            </li>
                                </>
                            }
                        </ul>
                   </div>
                   <div className='nav__icons'>
                        {
                            currentUserLogin ? <> 
                                <span className='cart__icon' >
                                    <i className="ri-shopping-bag-line"  onClick={toggleCartMessage}></i>
                                    <span className='badge'>{cart.length!==0?cart.length:0}</span>
                                </span>
                            </> : <>
                               
                            </>
                        }
                            <div className='nav__icons-children' ref={cartMessage} onClick={toggleCartMessage}>
                                <p className='text-center'>Recently Added Products</p>
                               {
                                cartMessList?cartMessList.map((item) => {
                                    return (
                                        <>
                                            <div className='nav__icons-product'>
                                                <img src={item.product.image} alt="img" />
                                                <p>{item.product.name}</p>
                                            </div>
                                        </>
                                    )
                                }):""
                               }
                               <div className='nav__icons-button'>
                                    <button onClick={navigateToCart}>View My shopping cart</button>
                               </div>
                            </div>

                        <span  className='profile'>
                            {
                                currentUserLogin ? <>
                                    <motion.img whileTap={{ scale: 1.3 }} src={avatar?avatar.avatar: `${user}`} alt="user" onClick={toggleProfile}/>
                                    <div className='profile__children' ref={profileActionRef} onClick={toggleProfile}>
                                    <Link to='/'><i class="ri-home-2-fill"></i> {isUser.fullName}</Link>
                                        <br />
                                    <Link to={`/profile`}><i class="ri-user-fill"></i> Profile</Link>
                                    <br />
                                    <Link to='/orderUser'><i class="ri-suitcase-fill"></i> History Order</Link>
                                    <br />
                                    <Link to='/' onClick={handleLogoutUser}><i class="ri-logout-box-r-fill"></i>Logout</Link>
                                 </div>
                           </> : <>
                                <motion.img whileTap={{ scale: 1.3 }} src={user} alt="user" onClick={toggleProfile}/>
                                   <div className='profile__children' ref={profileActionRef} onClick={toggleProfile}>
                                       <Link to='/login' onClick={handleLogoutUser}><i class="ri-login-box-fill"></i>Login</Link>
                                       <br />
                                        <Link to='/register' onClick={handleLogoutUser}><i class="ri-registered-fill"></i>Register</Link>
                                   </div>
                           </>
                            }
                           
                        </span>


                        <div className='mobile__menu'>
                            <span onClick={menuToggle}>
                                <i className="ri-menu-line"></i>
                            </span>
                        </div>
                   </div>
                    
                </div>
            </Row>
        </Container>
    </header>
};


export default Header;