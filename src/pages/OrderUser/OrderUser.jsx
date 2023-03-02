import React, { useEffect , useState} from 'react';
import Header from '../../layout/Header';
import Footer from '../../layout/Footer';
import './OrderUser.scss'
import { useDispatch, useSelector } from 'react-redux';
import { deleteCheckOut, fetchCheckOut } from '../../redux/Silice/checkOutSlice';
import axiosClient from '../../apis/axiosClient';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const OrderUser = () => {

    const top = () => {
        window.scrollTo(0, 0)
      }
    top()

    const [check, setCheck] = useState();
    const checkOutList = useSelector(item => item.checkOutList.checkOut);
    const user = useSelector(item => item.userList.users)
    const [render,setRender] = useState(false)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCheckOut())
    }, [render]);
    const [isLogin, setIsLogin] = useState(() => {
        const save = localStorage.getItem('userLogin') ? JSON.parse(localStorage.getItem('userLogin')) : [];
        return save;
    });
    const userLogin = user.find(item => item.email === isLogin.email) 
    let isUser;
    userLogin?isUser =userLogin:isUser=[];

    useEffect(() => {
        const featchCheckOut = async () => {
            const res =await axiosClient.get("checkout?_expand=user");
                setCheck(res.data)
            return res.data
        }
        featchCheckOut()
    },[isUser])

    const listCheckOutUser = checkOutList.filter(item => item.userId === userLogin.id);

    const handleDelete =(listCheckOutUser) => {
        dispatch(deleteCheckOut(listCheckOutUser.id))
        toast.warning("Bạn đã xóa 1 đơn hàng")
        const clearSetT = setTimeout(()=>{
            setRender(!render)
          },600)
        return () =>{clearTimeout(clearSetT)}
    }

    const [idOrderOf] = listCheckOutUser?listCheckOutUser.slice(-1):[]
    return (
       <>
        <Header/>
        <div className='information'>
            <h3>Cart information</h3>
            <div className='information-header'>
                <div className='information-header-left'>
                    <i class="ri-arrow-left-s-line"></i>
                    <Link to="/">Home</Link>
                </div>
                {
                    listCheckOutUser.length !== 0 ? <>
                        <div className='information-header-right'>
                            {
                                [idOrderOf]?[idOrderOf].map((item) => {
                                    return (
                                    <>
                                        <span>ID order: <a href="">{item?item.mdh:""}</a></span>
                                        <p>Wait for confirmation</p>
                                    </>
                                    )
                                }): ""
                            }
                        </div>
                    </>:""
                }
            </div>
            {
                listCheckOutUser.length !== 0 ? <>
                    <div className='information-header-body'>
                        <div className='information-icon'>
                            <i class="ri-bill-fill"></i>
                            <span>Order placed</span>
                            {
                                [idOrderOf]?[idOrderOf].map((item) => {
                                    return (
                                    <>
                                        <p>{item?item.timeOrder:""}</p>
                                    </>
                                    )
                                }): ""
                            }
                            <div className='straight-line'></div>
                        </div>
                        <div className='information-icon-none'>
                            <i class="ri-money-dollar-circle-fill"></i>
                            <span className='span-icon-center'>Payment confirmed</span>
                            <div className='straight-line-none'></div>
                        </div>
                        <div className='information-icon-none'>
                            <i class="ri-caravan-fill"></i>
                            <span>Delivered</span>
                            <div className='straight-line-none'></div>
                        </div>
                        <div className='information-icon-none'>
                            <i class="ri-inbox-archive-line"></i>
                            <span>Received</span>
                        </div>
                    </div>
                </>: 
                    <div className='information-header-drum'>
                        <div className='information-icon-drum'>
                            <i class="ri-bill-fill"></i>
                            <span>Order placed</span>
                            <div className='straight-line-drum'></div>
                        </div>
                        <div className='information-icon-drum'>
                            <i class="ri-money-dollar-circle-fill"></i>
                            <span className='span-icon-center-drum'>Payment confirmed</span>
                            <div className='straight-line-drum'></div>
                        </div>
                        <div className='information-icon-drum'>
                            <i class="ri-caravan-fill"></i>
                            <span className='span-end'>Delivered</span>
                            <div className='straight-line-drum'></div>
                        </div>
                        <div className='information-icon-drum'>
                            <i class="ri-inbox-archive-line"></i>
                            <span  className='span-end'>Received</span>
                        </div>`
                    </div>
                
            }
        </div>
        <div className='order-page'>
            <div className='order-content'>
                <div className='table-box'>
                    <div className='table-row table-header'>
                        <div className='table-cell table-cell-header'>
                            <p>Oder</p>
                        </div>
                        <div className='table-cell table-cell-header'>
                            <p>Order Code</p>
                        </div>
                        <div className='table-cell table-cell-header'>
                            <p>Quantity</p>
                        </div>
                        <div className='table-cell table-cell-header'>
                            <p>Total</p>
                        </div>
                        <div className='table-cell table-cell-header'>
                            <p>Time Order</p>
                        </div>
                        <div className='table-cell table-cell-header'>
                            <p>Delete</p>
                        </div>
                    </div>

                   {
                    listCheckOutUser?listCheckOutUser.map((item) => {
                        return (
                            <>
                                <div className='table-row'>
                                    <div className='table-cell'>
                                        {
                                            item.listOrder.map(list => {
                                                return (
                                                    <>
                                                        {
                                                            <div className='order-content-name'>
                                                                <img src={list.product.image}/>
                                                                <span>{list.product.name}</span>
                                                            </div>
                                                        }
                                                    </>
                                                )
                                            })
                                        }
                                    </div>
                                    <div className='table-cell'>
                                        {item.mdh}
                                    </div>
                                    <div className='table-cell'>
                                       {item.quantityOrder}
                                    </div>
                                    <div className='table-cell'>
                                        ${item.total}
                                    </div>
                                    <div className='table-cell'>
                                        {item.timeOrder}
                                    </div>
                                    <div className='table-cell'>
                                        <i onClick={() => handleDelete(item)} class="ri-delete-bin-5-fill"></i>
                                    </div>
                                </div>
                            </>
                        )
                    }) 
                  :'' }
                </div>
            </div>
        </div>

        <Footer/>
       </>
    );
};

export default OrderUser;