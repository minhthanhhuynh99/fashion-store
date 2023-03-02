import React, {useEffect, useState} from 'react';
import Header from '../../layout/Header';
import Footer from '../../layout/Footer';
import { Container, Row, Col, Form, FormGroup } from 'reactstrap';
import CommonSection from '../../components/UI/CommonSection/CommonSection';
import './Checkout.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../redux/Silice/UsersSlice';
import axiosClient from '../../apis/axiosClient';
import { v4 as uuidv4 } from 'uuid';
import { addCheckOut, fetchCheckOut } from '../../redux/Silice/checkOutSlice';
import { toast } from 'react-toastify';
import { deleteListOrder, deleteOrder } from '../../redux/Silice/ordersSlice';
import { useNavigate } from 'react-router-dom';


const Checkout = () => {
    const user = useSelector(item=> item.userList.users);
    const dispatch = useDispatch();
    const navigate = useNavigate()

    useEffect(() => {
        fetchUsers()
        fetchCheckOut()
    },[])


    const [orderUser, setOrderUser] = useState(() => {
        const res = JSON.parse(localStorage.getItem('userOrder'))??[]
        return res;
      });

    const [isLogin, setIsLogin] = useState(() => {
        const save = localStorage.getItem('userLogin') ? JSON.parse(localStorage.getItem('userLogin')) : [];
        return save;
      });

    const [users, setUsers] = useState([]);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [country, setCountry] = useState('');


    const userCartOderLogin = user.find(item => item.email === isLogin.email) 

    useEffect(() => {
        const featchUser = async () => {
            const res =await axiosClient.get(`users/${userCartOderLogin.id}`);
            setUsers(res.data)
            setFullName(res.data.fullName)
            setEmail(res.data.email)
            setPhone(res.data.phone)
            setAddress(res.data.address)
            setCountry(res.data.country)
            return res.data
        }
        featchUser()
    },[userCartOderLogin])

    const handleCheckOut = () =>{
        if(orderUser.length === 0) {
            toast.warning("Bạn chưa có sản phẩm nào trong giỏ hàng")
        }else {
            toast.success("Bạn đã mua hàng thành công")
            dispatch(addCheckOut({
                listOrder: orderUser,
                userId: userCartOderLogin.id,
                mdh: uuidv4(),
                timeOrder: new Date().toLocaleString(),
                quantityOrder: quantityOrder,
                total: total
            }))
            dispatch(deleteListOrder(orderUser))
            navigate("/thankyou")
        }
       
    }
    const quantityOrder = orderUser.reduce((sum,item) => {
        return sum + item.quantity
    },0)

    const total = orderUser.reduce((sum,item)=>{
        return sum+item.quantity*item.product.price 
      },0)

    console.log(quantityOrder,"quantityOrder");
    return (
        <div>
            <Header/>
            <CommonSection/>
            <section>
               <Container>
                    <Row>
                    <Col lg='12'>
                           <div className='checkout__content'>
                                <div className='checkout__title'>
                                    <i class="ri-map-pin-line"></i>
                                    <span>Delivery address</span>
                                </div>
                                <div className='checkout__billing'>
                                    <span>{fullName}({phone})</span>
                                    <span>{address} , {country}</span>
                                    <button>Default</button>
                                </div>
                           </div>
                        </Col>
                        <Col lg='12' className='mt-4'>
                            <div className='checkout__cart'>
                                <table className='table-cart'>
                                    <tr className='table-header-cart'>
                                        <th>
                                           <h4>Name Product</h4>
                                        </th>
                                        <th className='text-center'>
                                            <p>Price</p>
                                        </th>
                                        <th className='text-center'>
                                            <p>Quantity</p>
                                        </th>
                                        <th className='text-center'>
                                            <p>Into money</p>
                                        </th>
                                    </tr>

                                    {
                                        orderUser?orderUser.map((item) => {
                                            return (
                                                <>
                                                <tr className='table-body'>
                                                    <td className='td-name'>
                                                        <img src={item.product.image} alt="" />
                                                        <p>{item.product.name}</p>
                                                    </td>
                                                    <td className='text-center'>
                                                        <p>${item.product.price}</p>
                                                    </td>
                                                    <td className='text-center'>
                                                        <p><span>X</span> {item.quantity}</p>
                                                    </td>
                                                    <td className='text-center'>
                                                        <p>${item.product.price * item.quantity}</p>
                                                    </td>
                                                </tr>         
                                                </>
                                                )
                                        }): ""
                                    }
                                </table>
                                <div className='checkout-total'>
                                    <p>The total amount({quantityOrder} product):</p><span>${total}</span>
                                </div>
                                <div className='btn-content-total'>
                                    <button type='submit' className='btn-checkout' onClick={handleCheckOut}>Buy</button>
                                </div>
                            </div> 
                        </Col>
                    </Row>
               </Container>
            </section>
            <Footer/>
        </div>
    );
};

export default Checkout;
{/* <form className='checkout__form'>
                                        <h6 className='mb-4 fw-bold'>Billing Information</h6>
                                        <div className='checkout__form__group'>
                                            <p htmlFor="">Full Name</p>
                                            <input type="text" placeholder='Enter your name' value={fullName}/>
                                        </div>

                                        <div className='checkout__form__group'>
                                            <p htmlFor="">Email</p>
                                            <input type="email" placeholder='Enter your email' value={email} />
                                        </div>

                                        <div className='checkout__form__group'>
                                            <p htmlFor="">Phone</p> 
                                            <input type="number" placeholder='Enter your Phone number'value={phone} />
                                        </div>

                                        <div className='checkout__form__group'>
                                            <p htmlFor="">Address</p> 
                                            <input type="text" placeholder='Enter address' value={address}/>
                                        </div>

                                        <div className='checkout__form__group'>
                                            <p htmlFor="">City</p> 
                                            <input type="text" placeholder='Enter your City' value={country}/>
                                        </div>

                                    </form>
 */}
