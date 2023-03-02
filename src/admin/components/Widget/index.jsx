import React, { useEffect } from 'react'
// import {widgetData} from '../../../data/contants'
import './index.scss'
import {  useDispatch,useSelector } from 'react-redux'
import { useListSelector, useListSelectorProducts } from '../../../redux/selectors'
import { fetchUsers } from '../../../redux/Silice/UsersSlice'
import { fetchProducts } from '../../../redux/Silice/ProductsSlice'
import { useNavigate } from 'react-router-dom';

function Widget(props) {
    const userList = useSelector(useListSelector)
    const productList= useSelector(useListSelectorProducts)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchUsers());
        dispatch(fetchProducts());
      },[dispatch])

  
  const widgetData = [
        {
          id: 1,
          name: "Users",
          path:"/users",
          icon: <i className="fa-solid fa-user"></i>,
          total: <p>{userList.length}</p>,
          idName:"user_id"
        },
        {
          id: 2,
          name: "Orders",
          path:"/orders",
          icon: <i className="fa-solid fa-cart-shopping"></i>,
          total: <p>17</p>,
          idName:"orders_id"
        },
        {
          id: 3,
          name: "Products",
          path:"/products",
          icon: <i className="fa-sharp fa-solid fa-bag-shopping "></i>,
          total: <p>{productList.length}</p>,
          idName:"products_id"
        },
        {
          id: 4,
          name: "Doanh thu",
          path:"/revenues",
          icon: <i className="fa-solid fa-money-bill " ></i>,
          total: <p>18</p>,
          idName:"revenue_id"
        },
      ];
      const navigate = useNavigate()
      const handleClick =(path) =>{
        navigate(path)
      }
  return (
    <>
            {
                widgetData.map((data,index) => {
                    return(
                    <div className='widget__item' id={data.idName} key={index} onClick={()=>handleClick(data.path)}>
                        <div className='widget__name' >
                            <p>{data.name}</p>
                            <span>{data.icon}</span>
                          </div>
                          <div className='widget__total'>
                            {data.total}
                          </div>   
                    </div>
                    )
                })
            }
   </>
  )
}

export default Widget
