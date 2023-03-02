import React, { useEffect,useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../../../components/common/Button'
import InputText from '../../../../components/common/InputText'
import { useListSelectorProducts } from '../../../../redux/selectors'
// import { deleteProduct } from '../../../../redux/Silice/ProductsSlice'
import DataTable from 'react-data-table-component'
import { customStyles,DollarUsd } from '../../../../data/contants'
import { toast } from 'react-toastify';
import './index.scss'
import productApis from '../../../../apis/productApis'
function ProductList(props) {
  const [productData, setProductData] =useState([])
  const [search , setSearch] = useState("")
  const [searchFilter , setSearchFilter] = useState([])
  const [isLoad, setIsLoad] = useState(false)

  const navigate = useNavigate()
  const handleDelete = async(productID) =>{
    const checkDeleteItem = window.confirm("Do you want delete this user ?")
    if(checkDeleteItem){
      await productApis.delete(productID)
      toast.success("Delete success")
      setIsLoad(false)
    }
  }
  const getApiProductsAll = async()=>{
    const res = await productApis.getAll()
    setProductData(res.data)
    setSearchFilter(res.data)

  }
  useEffect(() =>{
    setIsLoad(true)
    getApiProductsAll()
},[isLoad])
// search
useEffect(() =>{
  const res = productData.filter(item => {
    return item.name.toLowerCase().match(search.toLowerCase())
  })
  setSearchFilter(res)
},[search])

const columns = [
    {
        name: "Tên",
        selector:(row) => row.name,
        maxWidth:"200px",
        center: "center"
    },
    {
        name: "Hình Ảnh",
        selector:(row) => <span><img src={row.image} alt="" className="image__table"/></span>,
        maxWidth:"100px",
        center: "center"
        
    },
    {
        name: "Giá Tiền",
        selector:(row) =>DollarUsd.format(row.price),
        maxWidth:"200px",
        center: "center"
    },
    {
        name: "Số Lượng",
        selector:(row) => row.inStock,
        maxWidth:"200px",
        center: "center"
    },
    {
        name: "Mô Tả",
        selector:(row) => row.description,
        maxWidth:"200px",
        center: "center"
    },
    {
      name: "Ngày Tạo",
      selector:(row) => row.created_at,
      maxWidth: "auto",
      center: "center"
  },
    {
        name: "Tác vụ",
        cell: (row) => 
            <div className='btn__group'>
                <Link to={`/products/edit-product/${row.id}`} state={{product:row}} className="item__link"><Button iconBtn={<i className="fa-sharp fa-solid fa-pen-to-square"></i>}/></Link>
                <Link><Button iconBtn={<i className="fa-solid fa-trash-can"></i>} OnClick={() =>handleDelete(row.id)}/></Link>
            </div>,  
         maxWidth:"200px",
         center: "center"
    }
]
  return (
    <>
      <div className="product__list">
        <div className='order__content'>
            <DataTable
                columns={columns}
                data={searchFilter}
                customStyles={customStyles}
                pagination
                fixedHeader
                fixedHeaderScrollHeight='530px'
                highlightOnHover
                pointerOnHover
                onRowClicked={(row) =>  navigate(`/products/view-product/${row.id}`)}
                responsive
                striped
                actions={
                <div>
                  <InputText
                      className="inputSearch"
                      type={"text"}
                      placeholder={"search"}
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                  />
                  <Link to={'/products/add-product'}><Button nameBtn={"Add"} className="btn__add"/></Link>
                </div>  
                }
                title={
                  <div className='total__product'><p>Total:<span>{productData.length}</span></p></div>
                }
            />
        </div>
      </div>
    
    </>
  )
}
export default ProductList
