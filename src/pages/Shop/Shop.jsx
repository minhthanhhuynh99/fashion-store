import React, { useEffect, useState } from 'react';
import Header from '../../layout/Header';
import Footer from '../../layout/Footer';
import {Container, Row, Col} from 'reactstrap'
import { Link, useNavigate ,NavLink} from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useListSelectorCategories } from '../../redux/selectors';
import { fetchCategories } from '../../redux/Silice/categoriesSlice';
import BtnScrollToTop from '../../components/common/ButtonScroll/BtnScrollToTop';
import './index.scss';
import  Pagination  from '../../components/UI/Pagination/Pagination';
import Loading from '../../util/loading/Loading';
import axiosClient from '../../apis/axiosClient';
import { fetchProducts } from '../../redux/Silice/ProductsSlice';


const Shop = ({}) => {

    const top = () => {
        window.scrollTo(0, 0)
      }
      top()

    const navigate = useNavigate()
    const [dataProducts, setDataProducts] = useState([]);
    const [value, setValue] = useState("");
    const [sortValue, setSortValue] = useState("");
    const [filterValue, setFilterValue] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(12);
    const [delay,setDelay] = useState('');

    const sortOption = ["name", "price"]

    const categoryList = useSelector(useListSelectorCategories);
    const dispatch = useDispatch();

    useEffect(() => {
        loadDataProduct();
        dispatch(fetchCategories());
    },[dispatch])

    const loadDataProduct = async () => {
        return await axios
            .get("http://localhost:9000/products")
            .then((response) => {
                setDataProducts(response.data);
            })
            .catch((err) => console.log(err))
    }
    //search
    const handleSearch = async () => {
        return await axios
            .get(`http://localhost:9000/products?q=${delay}`)
            .then((response) => {
                setDataProducts(response.data);
            })
            .catch((err) => console.log(err))
    }
    useEffect(()=>{
        const fetchSearh = async ()=>{
            const res = await axiosClient.get(`products?q=${delay}`)
            setDataProducts(res.data);
        return res.data
        }
        fetchSearh()
    },[delay])

    //clear
    const handleClear = () => {
        setValue("")
    }

    useEffect(()=>{
        const timer = setTimeout(()=>{
            setDelay(value)
        },500)
    return () =>{clearTimeout(timer)}
    },[value])
    //sort

    const handleSort = async (e) => {
        let value = e.target.value;
        setSortValue(value)
        return await axios
             .get(`http://localhost:9000/products?_sort=${value}`)
             .then((response) => {
                 setDataProducts(response.data);
                 setValue("")
             })
             .catch((err) => console.log(err))
     }

     //filter
     const listprd= useSelector(state=>state.productList.products)
     const handleFilter = async (e) => {
        const value = e.target.value;
        setFilterValue(value)
        const filterProduct = (listprd.filter(item => item.category_id === value));
            setDataProducts(filterProduct);
            if(value === "all") {
                setDataProducts(listprd)
            }
            setValue("")
      }

      //filter size
      const handleFilterSize = async (value) => {
        return await axios
             .get(`http://localhost:9000/products?${value}`)
             .then((response) => {
                const dataSize = response.data;
                const filterSizeProduct = (dataSize.filter(item => item.size === value));
                if(value === "S") {
                    setDataProducts(filterSizeProduct)
                }
                if(value === "M") {
                    setDataProducts(filterSizeProduct)
                }
                if(value === "L") {
                    setDataProducts(filterSizeProduct)
                }
                if(value === "all") {
                    setDataProducts(dataSize)
                }
                setValue("")
             })
             .catch((err) => console.log(err))
      }
      const handeSearchInput = (e) =>{
            setValue(e.target.value)
      }
      //pagination
      const lastPostIndex = currentPage * postsPerPage;
      const firstPostIndex = lastPostIndex - postsPerPage;
      const currentPost =  dataProducts.slice(firstPostIndex, lastPostIndex)
    return (
        <div>
            <Header/>
            <Container className='container__product_pages'>
            <section className='left'>
                <Container>
                    <Row>
                    <Col lg='6' md='6' >
                        <div className="filter__widget_1" >
                            <div 
                                onClick={handleFilter}
                                value={filterValue}
                            >
                                <button className='btn__filter_category-all' type='checked' value="all" onClick={handleFilter}>All</button>
                                {
                                    categoryList.map((item) => (
                                        <>
                                            <button className='btn__filter_category' key={item.id} value={item.id}>{item.name}</button>
                                        </>
                                    ))
                                }
                            </div>
                            

                        </div>
                    
                        <div className="filter__widget_2">
                            <p className=''>Arrange</p>
                            <div 
                                onClick={handleSort}
                                value={sortValue}
                            >
                                {sortOption.map((item, index) => (
                                    <button className='btn__filter_category' value={item} key={index}>{item}</button>
                                ))}
                            </div>
                        </div>
                        <div className="filter__widget_3">
                            <button className='filter__size' onClick={() =>handleFilterSize("S")}>S</button>
                            <button className='filter__size' onClick={() =>handleFilterSize("M")}>M</button>
                            <button className='filter__size' onClick={() =>handleFilterSize("L")}>L</button>
                        </div>
                    </Col>
                    </Row>
                </Container>
            </section>
            <section className='right'>
                <div className='search__box__container'>
                    <div className="search__box" >
                        <input 
                            type="text" 
                            placeholder='search.....' 
                            value={value}
                            onChange={handeSearchInput}
                        />
                        <button type="submit" onClick={handleSearch} className="btnSearch">Search</button>
                        <button  onClick={handleClear} className="btnReset">Clear</button>    
                        
                    </div>
                </div>
            </section>
            </Container>
            <Container>
                    {dataProducts.length === 0 && <Loading/>}
                    <Row>   
                        {

                            currentPost.map((item) => (
                                <Col lg='3' md='4' className=''>
                                   <div className='product-field'>
                                        <ul className='product-items'>
                                            <li className='product-li'>
                                                    <picture>
                                                        <img src={item.image} alt="" />
                                                    </picture>
                                                    <div className='detail'>
                                                        <p className='detail-icon'>
                                                            <span><i className='far fa-heart'></i></span>
                                                            <span><i className='far fa-share-square'></i></span>
                                                            <span><Link to={`/shop/${item.id}`}><i className='fas fa-shopping-basket'></i></Link></span>
                                                        </p>
                                                        <strong>{item.size}</strong>
                                                        <span>{item.name}</span>
                                                    <div className='detail-nav'>
                                                            <small><Link to={`/shop/${item.id}`}><i class="ri-arrow-right-circle-fill"></i></Link> </small>
                                                    </div>
                                                    </div>
                                                    <h4>${item.price}</h4>
                                                </li>
                                        </ul>
                                    </div>
                                </Col>
                           ))
                        
                        }
                    </Row>
                    <Pagination
                        totalPosts={dataProducts.length} 
                        postsPerPage={postsPerPage}
                        setCurrentPage={setCurrentPage}
                        currentPage={currentPage}
                    />
                  
                </Container>
            <Footer/>
            <BtnScrollToTop/>
        </div>
    );
};

export default Shop;