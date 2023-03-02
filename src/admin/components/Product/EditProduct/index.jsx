import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import InputText from '../../../../components/common/InputText'
// import { v4 as uuidv4 } from 'uuid';
import { useDispatch,useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { fetchCategories } from '../../../../redux/Silice/categoriesSlice';
import { useListSelectorCategories } from '../../../../redux/selectors';
// import { DollarUsd } from '../../../../data/contants';
import './index.scss'
import productApis from '../../../../apis/productApis';
function EditProduct(props) {
    const categoriesList = useSelector(useListSelectorCategories)
    // const [changeButton, setChangeButton]= useState(false)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchCategories());
      },[dispatch])
    const location = useLocation()
    const {product} = location.state
    const navigate = useNavigate()
    const onSubmit = async (values) =>{

        // dispatch(
        //     // updateUser({
        //     //     firstName: values.firstName,
        //     //     lastName:values.lastName,
        //     //     image:values.image,
        //     //     address:values.address,
        //     //     phone:values.phone,
        //     //     age:values.age,
        //     //     sex:values.sex,
        //     //     password:values.password,
        //     //     confirmPassword:values.confirmPassword,
        //     //     email:values.email,
        //     //     updated_at: new Date().toLocaleString(),
        //     // })
        // )
        await productApis.update(values);
        toast.success("update new success")
        navigate(`/products`)
        console.log(values);
    }
    const {values,handleChange,handleBlur,handleSubmit,errors,touched} = useFormik({
        initialValues:{
            id: product.id,
            name: product.name,
            image:product.image,
            inStock:product.inStock,
            price: (product.price),
            size:product.size,
            description:product.description,
            category_id:product.category_id,
            email:product.email,
            created_at: product.created_at,
            updated_at: new Date().toLocaleString(),
        },
        // validate,
        onSubmit,
    })
  return (
   <> <div className='edit__product'>
            <form className="ProductAdd__content"  onSubmit={handleSubmit}>
                <div className="title__addProduct">
                    <h5>Thông Tin</h5>
                </div>
            <div className='content__form'>
                <div className="ProductAdd__left">
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
                            placeholder={"URL"}
                        />
                    </div>
                    <div className="from__group">
                        <label>Name {errors.name && touched.name ? <span>{errors.name}</span> : null} </label>
                        <InputText
                            name="name"
                            type={"text"}
                            value={values.name}
                            onChange={handleChange}
                            onBlur ={handleBlur}
                            placeholder={"Nhập name"}
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
                           {categoriesList.map((data) =>{
                            return(
                            <>
                                <option key={data.id} value={data.id}>{data.name}</option>
                            </>
                            )
                        })}
                        </select>
                    </div>
                <div className="from__group">
                        <label>Số Lượng {errors.inStock && touched.inStock ? <span>{errors.inStock}</span> : null} </label>
                        <InputText
                            name="inStock"
                            type={"text"}
                            value={values.inStock}
                            onChange={handleChange}
                            onBlur ={handleBlur}
                            placeholder={"Nhập inStock"}
                        />
                    </div>
                <div className="from__group">
                        <label>Giá Tiền {errors.price && touched.price ? <span>{errors.price}</span> : null} </label>
                        <InputText
                            name="price"
                            type={"text"}
                            value={values.price}
                            onChange={handleChange}
                            onBlur ={handleBlur}
                            placeholder={"price"}
                        />
                    </div>
                    <div className="from__group">
                        <label>size {errors.size && touched.size ? <span>{errors.size}</span> : null} </label>
                        <select 
                            name="size" 
                            id="size"
                           onChange={handleChange}
                           onBlur ={handleBlur}
                           value={values.size}
                        >
                            <option value="S">S</option>
                            <option value="L">L</option>
                            <option value="M">M</option>
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
                    <InputText type={"submit"} value="Save"/>
                    <InputText type={"button"} value="Cancel" onClick={() => navigate('/products')}/>
                </div>
        </form>
        </div>
    </>
  )
}

export default EditProduct
