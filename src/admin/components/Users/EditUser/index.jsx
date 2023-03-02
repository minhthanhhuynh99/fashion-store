import React , { useEffect, useState }from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import InputText from '../../../../components/common/InputText'
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import userApis from '../../../../apis/userApis';
import { Provice } from '../../../../data/provice';

import './index.scss'
function EditUser(props) {
    const [changedButton, setChangedButton] = useState(false)
    const [datacheck, setDataCheck] = useState([])

    const location = useLocation()
    const {user} = location.state
    const navigate = useNavigate()

    const onSubmit = async(values) =>{
        await userApis.update(values);
      setTimeout(() =>{
        toast.success("update new success")
        navigate(`/users`)
      },900)
    }
    const validate = (values) =>{
        setChangedButton(true)
        const errors = {};
        // check
        const phoneno = /^\d{10}$/i;
        const checkEmail = datacheck.some(item => item.email === values.email)
        const CheckNumber = datacheck.some(item => item.phone === values.phone)
        const selected = new Date(values.age);
        const maxDate = new Date();
        // validate age
        if (selected > maxDate) {
            errors.age = "* Bạn không thể sinh vào tương lai";
          } else  if(maxDate.setDate(maxDate.getDate() -  3650) < selected){
            errors.age = "* Bạn chưa đủ  10 tuổi";
        }
        // if
          if(checkEmail === true) {
            errors.email = 'email đã tồn tại'
          }    
          if(CheckNumber === true){
            errors.phone = "* phone đã sử dụng";
        }
        if (!values.email) {
          errors.email = "* email is Required";
        }else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)){
            errors.email = 'Invalid email address';
        }
        if (!values.age) {
            errors.age = "* age is Required";
        }
        if (!values.phone) {
          errors.phone = "* phone is Required";
        } else if (!phoneno.test(values.phone)) {
          errors.phone = "* phone 10 numbers ";
        }
        return errors;
    }
    const {values,handleChange,handleBlur,handleSubmit,errors,touched} = useFormik({
        initialValues:{
            id: user.id,
            name: user.name,
            image:user.image,
            address:user.address,
            phone: user.phone,
            age:user.age,
            sex:user.sex,
            email:user.email,
            created_at: user.created_at,
            updated_at: new Date().toLocaleString(),
        },
        validate,
        onSubmit,
    })
    const getApiUser = async() =>{
        const result = await userApis.getAll()
        const filterUserName = result.data.filter(item => item.id !== user.id) 
        setDataCheck(filterUserName)
    }
    useEffect(() =>{
        getApiUser()
    },[])
  return (
    <>
         <div className='edit__user'>
         <form className="ProductAdd__content"  onSubmit={handleSubmit}>
                <div className="title__addProduct">
                    <h5>Profile</h5>
                </div>
            <div className='content__form'>
                <div className='img'>
                    <div className="from__img">
                        <img src={values.image} alt="" />
                    </div>
                    <div className="from__group">
                        <label>Image {errors.image && touched.image ? <span>{errors.image}</span> : null} </label>
                        <InputText
                            name="image"
                            type={"text"}
                            value={values.image}
                            onChange={handleChange}
                            onBlur ={handleBlur}
                            disabled
                        />
                    </div>
                </div>
              <div className='form__input'>
                    <div className="ProductAdd__left">
                        <div className="from__group">
                            <label>name {errors.name && touched.name ? <span>{errors.name}</span> : null} </label>
                            <InputText
                                name="name"
                                type={"text"}
                                value={values.name}
                                onChange={handleChange}
                                onBlur ={handleBlur}
                            />
                        </div>    
                        <div className="from__group">
                            <label>Address {errors.address && touched.address ? <span>{errors.address}</span> : null} </label>
                            <InputText
                                list={"data"}
                                name="address"
                                type={"text"}
                                value={values.address}
                                onChange={handleChange}
                                onBlur ={handleBlur}
                                
                            />
                             <datalist id="data">
                               {
                                Provice.map((item,index )=> <option key={index} value={item}></option>)
                               }
                              
                            </datalist>
                        </div>
                         <div className="from__group">
                            <label>Phone {errors.phone && touched.phone ? <span>{errors.phone}</span> : null} </label>
                            <InputText
                                name="phone"
                                type={"number"}
                                value={values.phone}
                                onChange={handleChange}
                                onBlur ={handleBlur}
                            />
                        </div>
    
                    </div>
                    <div className="ProductAdd__right">
                      <div className="from__group">
                            <label>Email {errors.email && touched.email ? <span>{errors.email}</span> : null} </label>
                            <InputText
                                name="email"
                                type={"text"}
                                value={values.email}
                                onChange={handleChange}
                                onBlur ={handleBlur}
                            />
                        </div>
                        <div className="from__group">
                            <label>Sex {errors.sex && touched.sex ? <span>{errors.sex}</span> : null} </label>
                            <select 
                                name="sex" 
                                id="size"
                               onChange={handleChange}
                               onBlur ={handleBlur}
                               value={values.sex}
                            >
                                <option value="" hidden></option>
                                <option value="Nam">Nam</option>
                                <option value="Nữ">Nữ</option>
                                <option value="Giới Tính Khác">Giới Tính khác</option>
                            </select>
                        </div>
                        <div className="from__group">
                            <label>Age {errors.age && touched.age ? <span>{errors.age}</span> : null} </label>
                            <InputText
                                name="age"
                                type={"date"}
                                value={values.age}
                                onChange={handleChange}
                                onBlur ={handleBlur}
                                placeholder={"Vd: Age: 23"}
                            />
                        </div>
                    </div>
              </div>
            </div>
                <div className="btn__group">
                    {
                        changedButton ? 
                        <>
                            <InputText type={"submit"} value="Update"/> 
                            <InputText type={"button"} value="Cancel" onClick={() => navigate('/users')}/>
                        </>
                        :
                        <InputText type={"button"} value="Cancel" onClick={() => navigate('/users')}/>
                    }
                </div>
        </form>
        </div>
    </>
  )
}

export default EditUser
