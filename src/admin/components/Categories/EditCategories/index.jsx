import React from 'react'
import InputText from '../../../../components/common/InputText'
import { useFormik } from 'formik';
// import { v4 as uuidv4 } from 'uuid';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
// import { useDispatch } from 'react-redux';
import categoriesApis from '../../../../apis/categoriesApis';


function EditCategories(props) {
    const location = useLocation()
    const {category} = location.state
    const navigate = useNavigate()
    // const dispatch = useDispatch()

    const onSubmit = async(values) =>{
        // dispatch(
        //     // addNewCategories({
        //     //     id: uuidv4(),
        //     //     name: values.name,
        //     //     created_at: new Date().toLocaleString(),
        //     // })
        // )
        await categoriesApis.update(values);
        toast.success("add Category success")
        navigate('/categories')
    }
    const {values,handleChange,handleBlur,handleSubmit,errors,touched} = useFormik({
        initialValues:{
            id: category.id,
            name: category.name,
            created_at: category.created_at,
            updated_at: new Date().toLocaleString(),
        },
        onSubmit,
    })
  return (
    <div className='addcategory'>
        <div className="addcategory__content">
            <form className='form' onSubmit={handleSubmit}>
                <div className="title">
                    <h5>Thông tin</h5>
                </div>
                <div className="form_group">
                    <label>Name{errors.name && touched.name ? <span>{errors.name}</span> : null}</label>
                    <InputText 
                        type="text"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur ={handleBlur}
                        placeholder={"VD: Áo Ba Lỗ"}
                    />
                </div>
                <div className="btn__group">
                    <InputText type={"submit"}/>
                    <InputText type={"button"} value="Cancel" onClick={() => navigate('/categories')}/>
                </div>
            </form>
        </div>
    </div>
  )
}

EditCategories.propTypes = {}

export default EditCategories
