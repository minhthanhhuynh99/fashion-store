import React, { useState, useEffect } from 'react'
import Button from '../../../../components/common/Button'
import InputText from '../../../../components/common/InputText'
import DataTable from 'react-data-table-component'
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom'
import { customStyles } from '../../../../data/contants'
import categoriesApis from '../../../../apis/categoriesApis';
import './index.scss'
function CategoriesList(props) {
    const [categoryData, setCategoryData] = useState([])
    const [search, setSearch] = useState("")
    const [filtered , setFiltered] = useState([])
    const [isLoad, setIsLoad] = useState(false)

    const getApiCategoryAll = async() =>{
      const res = await categoriesApis.getAll()
      setCategoryData(res.data);
      setFiltered(res.data)
    }
    // 
    useEffect(() => {
        setIsLoad(true)
        getApiCategoryAll()
      },[isLoad])

      useEffect(() =>{
        const res = categoryData.filter(item => {
          return item.name.toLowerCase().match(search.toLowerCase())
        })
        setFiltered(res)
      },[search])
    //  handle delete item by id
    const handleDelete = async(categoryID) =>{
        const checkDeleteItem = window.confirm("Do you want delete this categoryID ?")
        if(checkDeleteItem){
            await categoriesApis.delete(categoryID)
            toast.success("Xóa thành công")
            setIsLoad(false)
          }
    } 
    const columns = [
      {
          name: "Tên",
          selector:(row) => row.name,
          center: "center"
      },
      {
        name: "Ngày Tạo",
        selector:(row) => row.created_at,
        maxWidth: "auto",
        center: "center"
    },
    {
      name: "Ngày Update",
      selector:(row) => row.updated_at,
      maxWidth: "auto",
      center: "center"
  },
      {
          name: "Tác vụ",
          cell: (row) => 
              <div className='btn__group'>
                  <Link to={`/categories/edit-categories/${row.id}`} state={{category:row}} className="item__link"><Button iconBtn={<i className="fa-sharp fa-solid fa-pen-to-square"></i>}/></Link>
                  <Link><Button iconBtn={<i className="fa-solid fa-trash-can"></i>} OnClick={() =>handleDelete(row.id)}/></Link>
              </div>,  
  
           center: "center"
      }
  ]
  return (
    <>
    <div className='categoriesList'>
    <div className='order__content'>
            <DataTable
                columns={columns}
                data={filtered}
                customStyles={customStyles}
                pagination
                fixedHeader
                fixedHeaderScrollHeight='530px'
                highlightOnHover
                pointerOnHover
                // progressPending
                responsive
                actions={
                <div>
                  <InputText
                      className="inputSearch"
                      type={"text"}
                      placeholder={"search"}
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                  />
                  <Link to={'/categories/add-category'} ><Button nameBtn={"Add"} className="btn__add"/></Link>
                </div>
                
                }
                title={
                  <div className='total__product'><p>Total:<span>{categoryData.length}</span></p></div>
                }
            />
        </div>
    </div>
    </>
  )
}

CategoriesList.propTypes = {}

export default CategoriesList
