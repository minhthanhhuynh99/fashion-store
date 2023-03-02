import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import InputText from '../../../../components/common/InputText';
import { useFormik } from 'formik';
import { addNewUser } from '../../../../redux/Silice/UsersSlice';
import './index.scss'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
// import { StatusRole } from '../../../../data/contants';
import userApis from '../../../../apis/userApis';
import accountApis from '../../../../apis/accountApis';
import logodefault from '../../../../assets/images/logodefault.png'
import rolesApi from '../../../../apis/rolesApi';
import { Provice } from '../../../../data/provice';

function AddUser(props) {
    const [dataUser, setDateUser] = useState([])
    const [roles,setRoles] = useState([])
    const [changedButton, setChangedButton] = useState(false)

    const randomString = Math.random().toString(36).slice(-8);
    
    // 
    const dispatch = useDispatch()
    let navigate = useNavigate();
    const randomID =  uuidv4();
        
    const onSubmit = async(values) =>{
        dispatch(
            addNewUser({
                id: randomID,
                name: values.name,
                age:values.age,
                address:values.address,
                email:values.email,
                phone:values.phone,
                role_id:values.role,
                image:logodefault,
                sex:values.sex,
                created_at: new Date().toLocaleString(),
            })
        )
        await accountApis.add({
            "id":uuidv4(),
            "user_id": randomID,
            "userName": values.userName,
            "password" :randomString,
            "role_id":values.role,
            "create_at":new Date().toLocaleString()
        })
        // createAccount(newID)
        
        setTimeout(() =>{
            resetForm()
            toast.success("add new success")
            navigate('/users')
        },1000)
    }

    const validate = (values) =>{
        setChangedButton(true)
        const errors = {};
        // check
        // const checkAge = /^(10?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/i;
        const phoneno = /^\d{10}$/i;
        const checkEmail = dataUser.some(item => item.email === values.email)
        const CheckNumber = dataUser.some(item => item.phone === values.phone)
        const CheckUserName = dataUser.some(item => item.userName === values.userName)
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
        if (CheckUserName === true) {
            errors.userName = "* userName Đã Tồn Tại";
          }
          if(CheckNumber === true){
            errors.phone = "* phone đã sử dụng";
        }
        if (!values.userName) {
            errors.userName = "* userName is Required";
          }
          if (!values.name) {
            errors.name = "* name is Required";
          }
        if (!values.email) {
          errors.email = "* email is Required";
        }else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)){
            errors.email = 'Invalid email address';
        }
        if (!values.address) {
            errors.address = "* address is Required";
          }
        if (!values.age) {
            errors.age = "* age is Required";
          }
          if (!values.sex) {
            errors.sex = "* sex is Required";
          }
          if (!values.role) {
            errors.role = "* role is Required";
          }  
        if (!values.phone) {
          errors.phone = "* phone is Required";
        } else if (!phoneno.test(values.phone)) {
          errors.phone = "* phone 10 numbers ";
        }
        
        return errors;
    }

    const {values,handleChange,handleBlur,handleSubmit,errors,touched,resetForm} = useFormik({
        initialValues:{
            id: randomID,
            userName: "",
            name:"",
            age:"",
            address:"",
            phone: '',
            email:"",
            image:"",
            role:"",
            sex:"",
            created_at: new Date().toLocaleString(),
        },
        validate,
        onSubmit,  
    })
    const getApi = async() =>{
        const result = await userApis.getAll()
        setDateUser(result.data)
    }
    const getApiRoles = async() =>{
        const result = await rolesApi.getAll()
        setRoles(result.data)
    }
    useEffect(() =>{
        getApi()
        getApiRoles()
       
    },[])
  return (
    <>
        <div className='form__addUser'>
        <form className="ProductAdd__content"  onSubmit={handleSubmit}>
                <div className="title__addProduct">
                    <h5>Thêm mới Thành Viên</h5>
                </div>
            <div className='content__form'>
               
             <div className="form__input">
                    <div className="ProductAdd__left">
                        <div className="from__group">
                            <label>Username {errors.userName && touched.userName ? <span>{errors.userName}</span> : null} </label>
                            <InputText
                                name="userName"
                                type={"text"}
                                value={values.userName}
                                onChange={handleChange}
                                onBlur ={handleBlur}
                                placeholder={"Nhập userName"}
                            />
                        </div>
                        <div className="from__group">
                            <label>Email {errors.email && touched.email ? <span>{errors.email}</span> : null} </label>
                            <InputText
                                name="email"
                                type={"text"}
                                value={values.email}
                                onChange={handleChange}
                                onBlur ={handleBlur}
                                placeholder={"Vd : example@gmail.com"}
                            />
                           
                        </div>
                        <div className="from__group">
                            <label>Address {errors.address && touched.address ? <span>{errors.address}</span> : null} </label>
                            <InputText
                                list="data"
                                name="address"
                                type={"text"}
                                value={values.address}
                                onChange={handleChange}
                                onBlur ={handleBlur}
                                placeholder={"vd: Đà Nẵng"}
                            />
                             <datalist id="data">
                               {
                                Provice.map((item,index) => <option key={index} value={item}></option>)
                               }
                              
                            </datalist>
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
                    </div>
                    <div className="ProductAdd__right">
                    <div className="from__group">
                            <label>Name {errors.name && touched.name ? <span>{errors.name}</span> : null} </label>
                            <InputText
                                name="name"
                                type={"text"}
                                value={values.name}
                                onChange={handleChange}
                                onBlur ={handleBlur}
                                placeholder={"vd: Lee Hau"}
                            />
                        </div>
                        <div className="from__group">
                            <label>Role {errors.role && touched.role ? <span>{errors.role}</span> : null} </label>
                            <select 
                                name="role" 
                                id="role"
                               onChange={handleChange}
                               onBlur ={handleBlur}
                               value={values.role}
                            >
                                <option value="" hidden></option>
                                {roles.map((data,index) =><option key={index} value={data.id}>{data.type}</option>)}
                     
                            </select>
                        </div>
                         <div className="from__group">
                            <label>Phone {errors.phone && touched.phone ? <span>{errors.phone}</span> : null} </label>
                            <InputText
                                name="phone"
                                type={"number"}
                                value={values.phone}
                                onChange={handleChange}
                                onBlur ={handleBlur}
                                placeholder={"+84"}
                            />
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
                                <InputText type={"submit"} value="Save"/>
                                <InputText type={"reset"} onClick={resetForm}/>
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
export default AddUser
