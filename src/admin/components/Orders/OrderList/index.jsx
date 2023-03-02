import React from 'react'
import DataTable from 'react-data-table-component'
import './index.scss'
function OrdersList(props) {
   
  return (
    <div className="user__list">
        <div className='order__content'>
            <DataTable
                // columns={columns}
                // data={userList}
                // // customStyles={customStyles}
                // pagination
                // fixedHeader
                // fixedHeaderScrollHeight='530px'
                // highlightOnHover
                // pointerOnHover
                // onRowClicked={(row) =>  navigate(`/users/view-user/${row.id}`)}
                // responsive
                // actions={
                // <div>
                //   <InputText
                //       className="inputSearch"
                //       type={"text"}
                //       placeholder={"search"}
                //       // value={search}
                //       // onChange={(e) => setSearch(e.target.value)}
                //   />
                //   <Link to={'/users/add-user'}><Button nameBtn={"Add"} className="btn__add"/></Link>
                // </div>       
                // }
                // title={
                //   <div className='total__product'><p>Total:<span>{userList.length}</span></p></div>
                // }
            />
            </div>
        </div>
  )
}

export default OrdersList
