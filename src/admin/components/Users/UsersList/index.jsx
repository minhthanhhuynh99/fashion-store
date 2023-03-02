import React, { useCallback, useEffect,useMemo,useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import  Button  from '../../../../components/common/Button'
import InputText from '../../../../components/common/InputText'
import DataTable from 'react-data-table-component'
import { customStyles } from '../../../../data/contants'
import { toast } from 'react-toastify';
import accountApis from '../../../../apis/accountApis'
import { confirmAlert } from 'react-confirm-alert'; // Import
import { CSVLink } from 'react-csv'
import userApis from '../../../../apis/userApis'
import axios from 'axios';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import
import 'react-toastify/dist/ReactToastify.css';
import './index.scss'
function UsersList(props) {

  const [userData, setUserData ]= useState([]);
  const [dataAccount, setDataAccount] = useState("")
  const [search, setSearch] = useState("")
  const [filtered , setFiltered] = useState([])
  const [isLoad, setIsLoad] = useState(false)
  // const [arrayIds ,setArrayIds] = useState([])
  const [selectedRows, setSelectedRows] = useState([]);
  const [toggleCleared, setToggleCleared] =useState(false);
  const navigate = useNavigate()

  // getApi  all Account
 const getApiAccount = async () =>{
    const res = await accountApis.getAll()
    setDataAccount(res.data);
 }
// handle delete item
 const handleDelete = async(userID) =>{
  // setIsLoad(false)
  const Check = dataAccount.find(item => item.user_id === userID )
  const checkID = Check.id
  // pop up confirm
  confirmAlert({
      title: "You are sure" ,
      message: 'Do you want delete this user?',
      buttons: [
        {
          label: 'Yes',
          onClick: async() => {
            await accountApis.delete(checkID)
            await userApis.delete(userID)
            toast.success("Xóa thành công")
            setIsLoad(false)
            setSearch("")
          }
        },
        {
          label: 'No',
        }
      ],
    });
}
// get all api User
const getApiUserAll = async() =>{
  const res = await userApis.getAll()
  setUserData(res.data);
  setFiltered(res.data)
}
// 
  useEffect(() => {
      setIsLoad(true)  
      getApiAccount()
      getApiUserAll()
  },[ isLoad])
  // search
  useEffect(() =>{
    const res = userData.filter(item => {
      return item.name.toLowerCase().match(search.toLowerCase())
    })
    setFiltered(res)
  },[search])

  // set up columns table
  const columns = [
    {
        name: "Name",
        selector:(row) => row.name,
        center: "center"
    },
    {
      name: "Image",
      selector:(row) => <span><img src={row.image} alt="" className="image__table"/></span>,
      maxWidth:"100px",
      center: "center"
  },
    {
      name: "Email",
      selector:(row) => row.email,
      center: "center"
  }, 
  {
    name: "Role",
    selector:(row) => row.role_id
  //  {
  //   if(row.role_id === 1){
  //   <span >{row.role_id}</span>
  //   }
  //   if(row.role_id === 2){
  //     <span> Admin</span>
  //   }
  //  }
     ,
    center: "center",
    sortable: true,
}, 
    {
      name: "Created",
      selector:(row) => row.created_at,
      maxWidth: "auto",
      center: "center"
  },
    {
        name: "Action",
        cell: (row) => 
            <div className='btn__group'>
                <Link to={`/users/edit-user/${row.id}`} state={{ user:row }} className="item__link"><Button iconBtn={<i className="fa-sharp fa-solid fa-pen-to-square"></i>}/></Link>
                <Link><Button iconBtn={<i className="fa-solid fa-trash-can"></i>} OnClick={() =>handleDelete(row.id)}/></Link>
            </div>,  
         maxWidth:"200px",
         center: "center"
    }
]
// select value item  in table
const handleRowSelected = useCallback(state => {
  setSelectedRows(state.selectedRows);
}, []);

// handle select delete item
const handleDeleteSelect = async () =>{

  const SelectIDRow = selectedRows.map(item => item.id)
  // setArrayIds(SelectIDRow)
  console.log(SelectIDRow);
  const filterArray = userData.filter(item => item.id !== SelectIDRow)
  console.log(filterArray);
  
  // await axios.delete(`http://localhost:9000/users/${JSON.stringify(SelectIDRow)}`)
  // setIsLoad(false)
  setToggleCleared(!toggleCleared);
}

  return (
    <>
        <div className="user__list">
        <div className='order__content'>
            <DataTable
                columns={columns}
                data={filtered}
                customStyles={customStyles}
                pagination
                fixedHeader
                selectableRows
                selectableRowsHighlight
                clearSelectedRows={toggleCleared}
                onSelectedRowsChange={handleRowSelected}
                contextActions={
                  <div className='btn__delete'>
                    <Button iconBtn={<i className="fa-solid fa-trash-can"></i>} OnClick={handleDeleteSelect}/>
                  </div>
                }
                fixedHeaderScrollHeight='530px'
                highlightOnHover
                pointerOnHover
                onRowClicked={(row) =>  navigate(`/users/view-user/${row.id}`)}
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
                  <CSVLink className='exportCss' filename='listUsers' data={userData}><i className="fa-sharp fa-solid fa-download"></i> CSV</CSVLink>
                  <Link to={'/users/add-user'}><Button iconBtn={<i className="fa-sharp fa-solid fa-plus"></i>} nameBtn={"Add"} className="btn__add"/></Link>
                </div>       
                }
                title={
                  <div className='total__product'><p>Total:<span>{userData.length}</span></p></div>
                }
            />
            </div>
        </div>
       
    </>
  )
}

export default UsersList
