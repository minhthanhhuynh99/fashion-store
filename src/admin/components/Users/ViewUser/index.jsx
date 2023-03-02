import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import accountApis from '../../../../apis/accountApis';
import userApis from '../../../../apis/userApis';
import Button from '../../../../components/common/Button';
import './index.scss'

function ViewUser(props) {
    const [valueUser ,setValueUser] = useState([])
    const [dataAccount, setDataAccount ] = useState([])
    const navigate = useNavigate()
    const { idUser } = useParams();
    // 
    const handleClick =(id) =>{
       const Check = dataAccount.find(item => item.user_id === id )
        const checkID = Check.id
        navigate(`/users/change-account/${checkID}`)
    }
    // !!!!!!!!!!!!!!!!
    const getItemData = async (id) => {
        const response = await userApis.getItem(id);
        setValueUser(response.data);
      };
    const getDataAccount = async () =>{
        const res = await accountApis.getAll()
        setDataAccount(res.data)
    }
    // get api
    useEffect(() =>{
        getItemData(idUser);
        getDataAccount()
    },[])
    
  return (
    <div className='viewUser'>
        <div className='viewUser__content'>
            <div className='title'>Profile</div>
            <div className="content-viewUser">
                <div className="content__left">
                    <div className="from__img">
                        <img src={valueUser.image} alt="" />
                    </div>
                </div>
                <div className="content__right">
                    <div className="info__group">
                        <p className='label'>Name:</p>
                        <span >{valueUser.name}  </span>
                    </div>
                    <div className="info__group">
                        <p className='label'>Address:</p>
                        <span >{valueUser.address}  </span>
                    </div>
                    <div className="info__group">
                        <p className='label'>Phone (84+) :</p>
                        <span >{valueUser.phone}  </span>
                    </div>
                    <div className="info__group">
                        <p className='label'>Age:</p>
                        <span >{valueUser.age}  </span>
                    </div>
                    <div className="info__group">
                        <p className='label'>Sex:</p>
                        <span >{valueUser.sex}  </span>
                    </div>
                    <div className="info__group">
                        <p className='label'>Email:</p>
                        <span >{valueUser.email}  </span>
                    </div>
                  
                    <div className="link__changePassword">
                        <div 
                        onClick={() =>handleClick(valueUser.id)}
                       >
                        <i className="fa-regular fa-hand-point-right" ></i>
                        <span>Change password</span>
                        </div>
                        <div><Link to={`/users/edit-user/${valueUser.id}`} state={{user:valueUser}}><i className="fa-regular fa-hand-point-right"></i>Change info</Link></div>
                    </div>
                </div>
            </div>
                <div className="btn__click">
                   <Button nameBtn={"Thoát"}  OnClick={() => navigate(`/users`)}/>
                </div>
        </div>
    </div>
  )
}

export default ViewUser
