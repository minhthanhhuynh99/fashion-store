import React, { useEffect, useState } from 'react'
import InputText from '../../../../components/common/InputText'
import './index.scss'
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { useFormik } from 'formik';
import { addNewProduct } from '../../../../redux/Silice/ProductsSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { fetchCategories } from '../../../../redux/Silice/categoriesSlice';
import { useListSelectorCategories } from '../../../../redux/selectors';

function AddProduct(props) {
    const categoriesList = useSelector(useListSelectorCategories)
    const [changeButton, setChangeButton]= useState(false)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchCategories());
      },[dispatch])
    let navigate = useNavigate();
    const onSubmit = (values) =>{
        dispatch(
            addNewProduct({
                id: uuidv4(),
                name: values.name,
                inStock:values.inStock,
                price:values.price,
                category_id:values.category_id,
                size:values.size,
                created_at: new Date().toLocaleString(),
                image:values.image,
                description:values.description,
                status: true,
                qty:1
            })
        )
        resetForm()
        toast.success("add new success")
        navigate('/products')
    }
    const validate = (values) =>{
        setChangeButton(true)
        const errors = {};
        if (!values.name) {
          errors.name = "* name is Required";
        }
        if (!values.inStock) {
          errors.inStock = "* inStock is Required";
        }else if(!/^([1-9]{1,3})$/i.test(values.inStock)){
            errors.inStock = "* inStock not > 999 ";
        }
        if (!values.price) {
            errors.price = "* price is Required";
          }
        if (!values.category_id) {
            errors.category_id = "* category is Required";
          }
        if (!values.image) {
            errors.image = "* image is Required";
          }  
          if (!values.size) {
            errors.size = "* size is Required";
          }
        if (!values.description) {
          errors.description = "* description is Required";
        } 
        return errors;
    }
    const {values,handleChange,handleBlur,handleSubmit,errors,touched,resetForm} = useFormik({
        initialValues:{
            id: uuidv4(),
            name: "",
            inStock:"",
            price:"",
            category_id:"",
            size: '',
            description:"",
            status: true,
            image:"",
            created_at: new Date().toLocaleString(),
        },
        validate,
        onSubmit,
    })
  return (
    <div className='ProductAdd'>
        <form className="ProductAdd__content"  onSubmit={handleSubmit}>
                <div className="title__addProduct">
                    <h5>Thêm mới Sản phẩm</h5>
                </div>
            <div className='content__form'>
                <div className="ProductAdd__left">
                    <div className="from__group">
                        <label>Tên Sản Phẩm {errors.name && touched.name ? <span>{errors.name}</span> : null} </label>
                        <InputText
                            name="name"
                            type={"text"}
                            value={values.name}
                            onChange={handleChange}
                            onBlur ={handleBlur}
                            placeholder={"Tên Sản Phẩm"}
                        />
                    </div>
                    <div className="from__group">
                        <label>Số Lượng {errors.inStock && touched.inStock ? <span>{errors.inStock}</span> : null} </label>
                        <InputText
                            name="inStock"
                            type={"number"}
                            value={values.inStock}
                            onChange={handleChange}
                            onBlur ={handleBlur}
                            placeholder={"1 - 100"}
                        />
                    </div>
                    <div className="from__group">
                        <label>Giá Tiền {errors.price && touched.price ? <span>{errors.price}</span> : null} </label>
                        <InputText
                            name="price"
                            type={"number"}
                            value={values.price}
                            onChange={handleChange}
                            onBlur ={handleBlur}
                            placeholder={"VNĐ"}
                        />
                    </div>
                    <div className="from__group">
                        <label>Image {errors.image && touched.image ? <span>{errors.image}</span> : null} </label>
                        <InputText
                            name="image"
                            type={"text"}
                            value={values.image}
                            onChange={handleChange}
                            onBlur ={handleBlur}
                            placeholder={"URL"}
                        />
                    </div>
                </div>
                <div className="ProductAdd__right">
                <div className="from__group">
                        <label>Category {errors.category_id && touched.category_id ? <span>{errors.category_id}</span> : null} </label>
                        <select
                         value={values.category_id}
                         name="category_id" 
                         id="category_id"    
                         onChange={handleChange}
                         onBlur ={handleBlur}>
                            <option value="" hidden></option>
                           {categoriesList.map((data) =>{
                            return(
                            <>
                                <option  value={data.id}>{data.name}</option>
                            </>
                            )
                        })}
                        </select>
                    </div>
                <div className="from__group">
                        <label>Size {errors.size && touched.size ? <span>{errors.size}</span> : null} </label>
                        <select 
                            name="size" 
                            id="size"
                           onChange={handleChange}
                           onBlur ={handleBlur}
                           value={values.size}
                        >
                            <option value="" hidden></option>
                            <option value="S">S</option>
                            <option value="M">M</option>
                            <option value="L">L</option>
                        </select>
                    </div>
                    <div className="from__group">
                        <label>Mô tả {errors.description && touched.description ? <span>{errors.description}</span> : null} </label>
                            <textarea 
                            id="description" 
                            name="description" 
                            rows="4" 
                            cols="50"
                            placeholder="Write Something"
                            onChange={handleChange}
                            onBlur ={handleBlur}
                            value={values.description}
                            >
                            </textarea>
                    </div>
                </div>
            </div>
                <div className="btn__group">
                    {
                        changeButton ?
                        <>
                            <InputText type={"submit"} value="Save"/>
                    <InputText type={"reset"} onClick={resetForm}/>
                    <InputText type={"button"} value="Cancel" onClick={() => navigate('/products')}/>
                        </>
                       :<InputText type={"button"} value="Cancel" onClick={() => navigate('/products')}/> 
                    }
                </div>
        </form>
    </div>
  )
}

AddProduct.propTypes = {}

export default AddProduct
