import React,{useState,useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import accountApis from '../../../../apis/accountApis';
import InputText from '../../../../components/common/InputText';
import { useFormik } from 'formik';
import './index.scss'
import { toast } from 'react-toastify';

function ChangeAccount(props) {
    const [valueUser ,setValueUser] = useState([])
    const { idAccount } = useParams();
    const [changedButton, setChangedButton] = useState(false)
    let navigate = useNavigate();
    const onSubmit = async(values) =>{
        await accountApis.update({
            id: valueUser.id,
            user_id: valueUser.user_id,
            email:valueUser.email,
            password:values.newPassword,
            updated_at: new Date().toLocaleString(),
        });
        resetForm()
        toast.success("Thay đổi mật khẩu thành công")
        navigate(`/users`)
    }
    const validate = (values) =>{
        setChangedButton(true)
        const errors = {}
        if (!values.password) {
            errors.password= "* Bạn chưa nhập mật khẩu cũ"
        }
        if (valueUser.password !== values.password) {
            errors.password= "*Mật khẩu cũ Không chính xác"
        }
        if (!values.newPassword) {
            errors.newPassword= "*Trường này không được để trống "
        }
        if (!values.confirmPassword) {
            errors.confirmPassword= "*Trường này không được để trống"
        }
        if(values.newPassword !== values.confirmPassword ){
                errors.confirmPassword = "* confirmPassword is not match";
              }
        return errors
    }
    const {values,handleChange,handleBlur,handleSubmit,errors,touched,resetForm} = useFormik({
        initialValues:{
            id: valueUser.id,
            user_id: valueUser.user_id,
            email:valueUser.email,
            password:"",
            newPassword:"",
            confirmPassword:"",
            create_at: valueUser.create_at,
            updated_at: new Date().toLocaleString(),
        },
        validate,
        onSubmit,
    })
    const getItemData = async (id) => {
        const response = await accountApis.getItem(id);
        setValueUser(response.data);
      };

    useEffect(() =>{
        getItemData(idAccount);
    },[])
  return (
    <div className='changeAccount'>
      <div className='changeAccount__content'>
           <form className='form' onSubmit={handleSubmit}>
                     <div className="title">
                        <h5>Change Password</h5>
                    </div>
                <div className='form__group'>
                    <label htmlFor="">Old Password {errors.password && touched.password ? <span>{errors.password}</span> : null}</label>
                    <InputText 
                    type="password"
                    name="password"
                    onChange={handleChange}
                    onBlur ={handleBlur}
                    value={values.password}
                    />
                </div>
                <div className='form__group'>
                    <label htmlFor="">New Password{errors.newPassword && touched.newPassword ? <span>{errors.newPassword}</span> : null}</label>
                    <InputText 
                    type="password"
                    name="newPassword"
                    onChange={handleChange}
                    onBlur ={handleBlur}
                    value={values.newPassword}
                    />
                </div>
                <div className='form__group'>
                    <label htmlFor="">ConfirmPassword {errors.confirmPassword && touched.confirmPassword ? <span>{errors.confirmPassword}</span> : null}</label>
                     <InputText type="password"
                       name="confirmPassword"
                       onChange={handleChange}
                       onBlur ={handleBlur}
                       value={values.confirmPassword}
                     />
                </div>
                <div className="btn__group">
                  {
                    changedButton ?
                    <>
                    <InputText  type="submit" value={"Save"}/>
                    <InputText  type="button" value={"Cancel"} onClick={() => navigate(`/users`)}/>
                    </>
                    : <InputText  type="button" value={"Cancel"} onClick={() => navigate(`/users`)}/>
                  }
                </div>
           </form>
      </div>
    </div>
  )
}
export default ChangeAccount
