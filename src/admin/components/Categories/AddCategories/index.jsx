import React, { useEffect } from 'react'
import InputText from '../../../../components/common/InputText'
import { useFormik } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { addNewCategories, fetchCategories } from '../../../../redux/Silice/categoriesSlice';
import './index.scss'
import { useListSelectorCategories } from '../../../../redux/selectors';
function AddCategory(props) {
    const categoriesList = useSelector(useListSelectorCategories)
    const dispatch = useDispatch()
    let navigate = useNavigate();
    useEffect(() => {
        dispatch(fetchCategories());
      },[dispatch])
    // onsubmit form
    const onSubmit = (values) =>{
        dispatch(
            addNewCategories({
                id: uuidv4(),
                name: values.name,
                created_at: new Date().toLocaleString(),
            })
        )
        resetForm()
        toast.success("add Category success")
        navigate('/categories')
    }
    // validate form
    const validate = (values) =>{
        const errors = {};
        const CheckCategory = categoriesList.some(item => item.name === values.name)
        // 
        if (!values.name) {
          errors.name = "* name is Required";
        } 
        if(CheckCategory === true){
            errors.name = "* name Already Exist"
        }
        return errors;
    }
    const {values,handleChange,handleBlur,handleSubmit,errors,touched,resetForm} = useFormik({
        initialValues:{
            id: uuidv4(),
            name: "",
            created_at: new Date().toLocaleString(),
        },
        validate,
        onSubmit,
    })
  return (
    <div className='addcategory'>
        <div className="addcategory__content">
            <form className='form' onSubmit={handleSubmit}>
                <div className="title">
                    <h5>Add new Category</h5>
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
export default AddCategory
