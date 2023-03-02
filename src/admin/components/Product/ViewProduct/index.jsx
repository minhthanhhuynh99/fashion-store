import React, { useEffect, useState } from 'react'
import { useParams,Link, useNavigate } from 'react-router-dom'
import productApis from '../../../../apis/productApis';
import Button from '../../../../components/common/Button';
import { DollarUsd } from '../../../../data/contants';
import './index.scss'
function ViewProduct(props) {
    const [valueProduct, setValueProduct] = useState([])
    const navigate = useNavigate()
    const {idItem}  = useParams()
    const getItemData = async (id) => {
        const response = await productApis.getItem(id);
        setValueProduct(response.data);
      };
      useEffect(() =>{
        getItemData(idItem)
      },[])

  return (
    <div className='viewProduct'>
        <div className='viewUser__content'>
            <div className='title'>Thông tin</div>
            <div className="content-viewUser">
                <div className="content__left">
                    <div className="from__img">
                        <img src={valueProduct.image} alt="" />
                    </div>
                </div>
                <div className="content__right">
                    <div className="info__group">
                        <p className='label'>Tên:</p>
                        <span >{valueProduct.name}</span>
                    </div>
                    <div className="info__group">
                        <p className='label'>Giá Tiền:</p>
                        <span >{DollarUsd.format(valueProduct.price)} </span>
                    </div>
                    <div className="info__group">
                        <p className='label'>Size</p>
                        <span >{valueProduct.size}  </span>
                    </div>
                    <div className="info__group">
                        <p className='label'>Mô tả:</p>
                        <span >{valueProduct.description}  </span>
                    </div>
                    {/* <div className="info__group">
                        <p className='label'>Category:</p>
                        <span >{valueProduct.category_id}  </span>
                    </div> */}
                    <div className="info__group">
                        <p className='label'>Số Lượng:</p>
                        <span >{valueProduct.inStock}  </span>
                    </div>
                    <div className="info__group">
                        <p className='label'>Tình Trạng:</p>
                        <span >{valueProduct.status}  </span>
                    </div>
                    <div className="info__group">
                        <p className='label'>Created_at:</p>
                        <span >{valueProduct.created_at}  </span>
                    </div>
                    <div className="info__group">
                        <p className='label'>Updated_at:</p>
                        <span >{valueProduct.updated_at}</span>
                       
                    </div>
                    <div className="link__changePassword">
                        <Link to={`/products/edit-product/${valueProduct.id}`} state={{product:valueProduct}}><i className="fa-regular fa-hand-point-right"></i>Thay Đổi Thông Tin</Link>
                    </div>
                </div>
            </div>
                    <div className="btn__click">
                       <Button nameBtn={"Thoát"} OnClick={() => navigate(`/products`)}/>
                    </div>
        </div>
    </div>
  )
}

export default ViewProduct
