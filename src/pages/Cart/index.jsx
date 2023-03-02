import React, { useEffect, useState } from 'react';
import Footer from '../../layout/Footer';
import Header from '../../layout/Header';
import './Cart.scss';
//
import { Container , Row, Col } from 'reactstrap';
import CommonSection from '../../components/UI/CommonSection/CommonSection';
import BtnScrollToTop from '../../components/common/ButtonScroll/BtnScrollToTop';
import { motion} from 'framer-motion';
import { toast } from 'react-toastify';

import { Link, useNavigate } from 'react-router-dom';
import axiosClient from '../../apis/axiosClient';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../redux/Silice/UsersSlice';
import { fetchProducts } from '../../redux/Silice/ProductsSlice';
import { deleteOrder, fetchCartOder, updateOder } from '../../redux/Silice/ordersSlice';


function Cart(props) {

  const top = () => {
    window.scrollTo(0, 0)
  }
  top()
  const navigate = useNavigate()
  const [render,setRender] = useState(false)
  const user = useSelector(state=>state.userList.users)
  const listPrd = useSelector(state=>state.productList.products)
  const [isLogin, setIsLogin] = useState(() => {
    const save = localStorage.getItem('userLogin') ? JSON.parse(localStorage.getItem('userLogin')) : [];
    return save;
  });

  const userCart = user.find(item => item.email === isLogin.email) 
  console.log(userCart);

  const [cartOfUser,setCartOfUser] = useState()
  useEffect(()=>{
    const fetchCartUser = async () =>{
      const res = await axiosClient.get(`users/${userCart.id}?_embed=cartOder`)
      setCartOfUser(res.data)
    }
    fetchCartUser()
  },[userCart])


  const listIdPrd = cartOfUser?cartOfUser.cartOder.map(item=>item.productId):[]

  const productCart = listPrd.filter(function(value) {
  return this.has(value.id)
  }, new Set(listIdPrd))


  const [cartPrd,setCartPrd] = useState()
  useEffect(()=>{
    const fetchCart = async ()=>{
      const res = await axiosClient.get(`cartOder?_expand=product`)
      setCartPrd(res.data)
    }
    fetchCart()
  },[userCart,render])
  const listPrdUser = cartPrd?cartPrd.filter(item=>item.userId===userCart.id):[];

  //giam
  const handleDecre = (product) =>{
    if(product.quantity <= 1) {
      dispatch(deleteOrder(product.id))
      const clearSetT = setTimeout(()=>{
        setRender(!render)
      },600)
      return () =>{clearTimeout(clearSetT)}
    }else{
      dispatch(updateOder({
        id: product.id,
        quantity: product.quantity-1
      }))
      const clearSetT = setTimeout(()=>{
        setRender(!render)
      },600)
      return () =>{clearTimeout(clearSetT)}
    }
  }
  //tang
  const handelIncre = (product) =>{
      if(product.quantity >= product.product.inStock){
        toast.warn("Sản phẩm trong kho hàng không đủ");
      }else{
        dispatch(updateOder({
          id: product.id,
          quantity: product.quantity<product.product.inStock?product.quantity+1:product.product.inStock
        }))
      }
      const clearSetT = setTimeout(()=>{
        setRender(!render)
      },600)
      return () =>{clearTimeout(clearSetT)}
     
  }
    //delete;
  const handleDelete = (product) =>{
    dispatch(deleteOrder(product.id))
    toast.warning("Bạn đã xóa sản phẩm khỏi giỏ hàng của mình")
    const clearSetT = setTimeout(()=>{
      setRender(!render)
    },600)
    return () =>{clearTimeout(clearSetT)}
  }

  const dispatch = useDispatch()
  useEffect(()=>{
  dispatch(fetchUsers())
  dispatch(fetchProducts())
  },[])
  const total = listPrdUser.reduce((sum,item)=>{
    return sum+item.quantity*item.product.price 
  },0)
  localStorage.setItem('userOrder', JSON.stringify(listPrdUser))
  const handleGoCheckout = () => {
    if(listPrdUser.length===0){
      toast.warning('Bạn không thể mua khi giỏ hàng đang trống!!!')
    } else{
      navigate("/checkout")
    }
  }
  return (
    <div>
        <Header/>
          <CommonSection/>
          <section>
              <Container>
                <Row>
                  <Col lg='9'>
                    {
                      listPrdUser.length === 0 ? <h3>There are no products in the cart</h3> 
                      : 
                      <table className='table bordered'>
                        <thead>
                          <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Qty</th>
                            <th>Delete</th>
                          </tr>
                        </thead>

                        <tbody>
                          {
                            listPrdUser.map((item) => (
                              <tr key={item.id}>
                                <td><img src={item.product.image} alt="" /></td>
                                <td>{item.product.name}</td>
                                <td>${item.product.price * item.quantity}</td>
                                <td>
                                  <button className='buy__btn-des'
                                    onClick={()=>handleDecre(item)}>
                                    -
                                  </button>
                                  <input type="text" className='input__qty' value={item.quantity}/>
                                  <button className='buy__btn-des'
                                     onClick={()=>handelIncre(item)}>
                                    +
                                  </button>
                                </td>
                                <td>
                                  <motion.i whileTap={{scale: 1.2}} className="ri-delete-bin-line" onClick={() => handleDelete(item)}></motion.i>
                                </td>
                              </tr>
                            ))
                          }
                        </tbody>
                    </table>
                    }
                      
           
                  </Col>
                  <Col lg='3'>
                    <div>
                      <h6 className='d-flex align-items-center justify-content-between'>
                        Total
                        <span className='fs-4 fw-bold ' >$ {listPrdUser.reduce((sum,item)=>{
                          return sum+item.quantity*item.product.price 
                        },0)}</span>
                      </h6>
                    </div>
                    <p className='mt-2 mb-3'>Shipping will calculate in checkout</p>
                    <div>
                      <button className='buy__btn w-100' onClick={handleGoCheckout}><Link to='' className='lll'>Check out</Link></button>
                      <br />
                      <br />
                      <button className='buy__btn w-100'><Link to='/shop' className='lll'>Shopping</Link></button>
                    </div>
                  </Col>
                </Row>
              </Container>
          </section>

        <Footer/>
        <BtnScrollToTop/>
    </div>
  )
};


export default Cart